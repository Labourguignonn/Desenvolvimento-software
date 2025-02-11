import requests
import re

#def getTitle(indice):
#    return base["title"][indice]
#
#def getOverview(indice):
#    return base["overview"][indice]
#
#def getRuntime(indice):
#    return base["runtime"][indice]
#
#def getPoster(indice):
#    return base["poster_path"][indice]
#    
#def getDirector(indice):
#       return base["director"][indice]

def collecting_data(films_lists, MaxRuntime, selected_genres):
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjJlZjM0MWRhOWM1NTM3ZThmOGRlNzA0ZDJhM2M2ZiIsIm5iZiI6MTczMzQyNzUyMS44NjcsInN1YiI6IjY3NTIwMTQxYWIzN2ZjZDNlODg1MTMzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iVq091IX6ZNnQeht3EhzNOotU61iFU8mcyFq7a2INQQ"
    }

    right_films_list = []
    #local onde ficam armazenados os dados dos filmes
    base = {"title" : [], "overview" : [], 'runtime' : [], 'poster_path' : [], "director" : [], "review" : []}
    id_filmes = []


    #Pegar o id de cada filme
    for i in range(len(films_lists)):
        films_lists[i].lower()
        search = re.sub(' ', '%20', films_lists[i])
        url = f"https://api.themoviedb.org/3/search/movie?query={search}&include_adult=false&language=en-US&page=1"
        chamada = requests.get(url, headers=headers)
        if(len(chamada.json()["results"]) > 0):
            filme = chamada.json()["results"][0]
            id_filmes.append(filme["id"])
    
    #Pegar o id dos gêneros selecionados
    url_genre = "https://api.themoviedb.org/3/genre/movie/list?language=en"
    genre_calling = requests.get(url_genre, headers=headers)
    selected_genres_id = []
    for j in range(len(selected_genres)):
        for gc in range(len(genre_calling)):
            if genre_calling[gc].get("name") == selected_genres[j]:
                selected_genres_id.append(genre_calling[gc].get("id"))



    #Pegar os dados de cada filme
    for i in range(len(films_lists)):
        url_id = f"https://api.themoviedb.org/3/movie/{id_filmes[i]}?language=pt-BR"
        chamada = requests.get(url_id, headers=headers)
        #Saber se o filme recomendado pela IA atende os requisitos dos gêneros selecionados
        genre_valid = False
        for sg in range(len(selected_genres_id)):
            if not genre_valid:
                for fg in range(len(chamada.json()["genre"])):
                    if(selected_genres_id[sg] == chamada.json()["genre"].get("id")):
                        genre_valid = True
                        break
            else:
                break
        #Caso o filme for válido pega os dados dele para serem utilizados
        if(genre_valid):
            if chamada.json()["runtime"] <= MaxRuntime + 10:
                right_films_list.append(films_lists[i])
                
                #adicionando no dicionário
                base["title"].append(chamada.json()["title"])
                base["overview"].append(chamada.json()["overview"])
                base["runtime"].append(chamada.json()["runtime"])
                base["poster_path"].append(chamada.json()["poster_path"])
                
                #Pegar a avaliação do filme
                imdb_id = chamada.json()["imdb_id"]
                url_review = f"https://api.themoviedb.org/3/find/{imdb_id}?external_source=imdb_id"
                chamada_review = requests.get(url_review, headers=headers)
                base["review"].append(chamada_review.json()["vote_average"])
                
                #Achar o diretor
                url_diretor = f"https://api.themoviedb.org/3/movie/{id_filmes[i]}/credits?language=en-US"
                chamada_casting = requests.get(url_diretor, headers=headers)
                iterar = chamada_casting.json()["crew"]
                base["director"].append([])
                for j in range(len(iterar)):
                    if(iterar[j]["job"] == "Director"):
                        base["director"][len(right_films_list) - 1].append(iterar[j]["name"])
                        break
    return (base)


