import requests
import re

headers = {
    "accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjJlZjM0MWRhOWM1NTM3ZThmOGRlNzA0ZDJhM2M2ZiIsIm5iZiI6MTczMzQyNzUyMS44NjcsInN1YiI6IjY3NTIwMTQxYWIzN2ZjZDNlODg1MTMzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iVq091IX6ZNnQeht3EhzNOotU61iFU8mcyFq7a2INQQ"
}

films_lists = ['onde os fracos nao tem vez']
base = {"title" : [], "overview" : [], 'runtime' : [], 'Classificação indicativa' : [], 'poster_path' : [], "Diretor" : []}
id_filmes = []
for i in range(len(films_lists)):
    films_lists[i].lower()
    search = re.sub(' ', '%20', films_lists[i])
    url = f"https://api.themoviedb.org/3/search/movie?query={search}&include_adult=false&language=en-US&page=1"
    chamada = requests.get(url, headers=headers)
    filme = chamada.json()["results"][0]
    id_filmes.append(filme["id"])
for i in range(len(films_lists)):
    url_id = f"https://api.themoviedb.org/3/movie/{id_filmes[i]}?language=pt-BR"
    chamada = requests.get(url_id, headers=headers)
    base["title"].append(chamada.json()["title"])
    base["overview"].append(chamada.json()["overview"])
    base["runtime"].append(chamada.json()["runtime"])
    base["poster_path"].append(chamada.json()["poster_path"])
    diretor = False
    url_diretor = f"https://api.themoviedb.org/3/movie/{id_filmes[i]}/credits?language=en-US"
    chamada_casting = requests.get(url_diretor, headers=headers)
    iterar = chamada_casting.json()["crew"]
    base["Diretor"].append([])
    for j in range(len(iterar)):
        if(iterar[j]["job"] == "Director"):
            base["Diretor"][i].append(iterar[j]["name"])



