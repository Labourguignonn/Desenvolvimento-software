import requests
import re

def getTitle(indice):
    return base["title"][indice]

def getOverview(indice):
    return base["overview"][indice]

def getRuntime(indice):
    return base["runtime"][indice]

def getPoster(indice):
    return base["poster_path"][indice]
    
def getDiretor(indice):
    return base["director"][indice]

def collecting_data(films_lists, MaxRuntime):
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjJlZjM0MWRhOWM1NTM3ZThmOGRlNzA0ZDJhM2M2ZiIsIm5iZiI6MTczMzQyNzUyMS44NjcsInN1YiI6IjY3NTIwMTQxYWIzN2ZjZDNlODg1MTMzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iVq091IX6ZNnQeht3EhzNOotU61iFU8mcyFq7a2INQQ"
    }

    right_films_list = []
    #local onde ficam armazenados os dados dos filmes
    base = {"title" : [], "overview" : [], 'runtime' : [], 'poster_path' : [], "director" : []}
    id_filmes = []


    #Pegar o id de cada filme
    for i in range(len(films_lists)):
        films_lists[i].lower()
        search = re.sub(' ', '%20', films_lists[i])
        url = f"https://api.themoviedb.org/3/search/movie?query={search}&include_adult=false&language=en-US&page=1"
        chamada = requests.get(url, headers=headers)
        filme = chamada.json()["results"][0]
        id_filmes.append(filme["id"])


    #Pegar os dados de cada filme
    for i in range(len(films_lists)):
        url_id = f"https://api.themoviedb.org/3/movie/{id_filmes[i]}?language=pt-BR"
        chamada = requests.get(url_id, headers=headers)
        if chamada.json()["runtime"] <= MaxRuntime + 10:
            right_films_list.append(films_lists[i])
            
            #adicionando no dicionário
            base["title"].append(chamada.json()["title"])
            base["overview"].append(chamada.json()["overview"])
            base["runtime"].append(chamada.json()["runtime"])
            base["poster_path"].append(chamada.json()["poster_path"])
            
            #Achar o diretor
            url_diretor = f"https://api.themoviedb.org/3/movie/{id_filmes[i]}/credits?language=en-US"
            chamada_casting = requests.get(url_diretor, headers=headers)
            iterar = chamada_casting.json()["crew"]
            base["director"].append([])
            for j in range(len(iterar)):
                if(iterar[j]["job"] == "director"):
                    base["director"][len(right_films_list) - 1].append(iterar[j]["name"])
                    break
    return (base)


