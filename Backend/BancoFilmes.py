import requests
import re


# Função que busca os IDs dos filmes
def get_movie_ids(films, headers):
    ids = []
    for film in films:
        query = re.sub(' ', '%20', film.lower())
        try:
            response = requests.get(f"https://api.themoviedb.org/3/search/movie?query={query}&include_adult=false&language=en-US&page=1", headers=headers)
            response.raise_for_status()
            results = response.json().get("results", [])
            if results:
                ids.append(results[0]["id"])
        except requests.exceptions.RequestException as e:
            print(f"Erro ao buscar {film}: {e}")
    return ids

# Função que busca os IDs dos gêneros
def get_genre_ids(selected_genres, headers):
    try:
        response = requests.get("https://api.themoviedb.org/3/genre/movie/list?language=en", headers=headers)
        response.raise_for_status()
        genres = response.json().get("genres", [])
        return [g["id"] for g in genres if g["name"] in selected_genres]
    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar gêneros: {e}")
        return []

# Função que busca o diretor do filme
def get_director(film_id, headers):
    try:
        response = requests.get(f"https://api.themoviedb.org/3/movie/{film_id}/credits?language=en-US", headers=headers)
        response.raise_for_status()
        for crew in response.json().get("crew", []):
            if crew["job"] == "Director":
                return crew["name"]
    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar diretor do filme ID {film_id}: {e}")
    return "Unknown"

def collecting_data(films_lists, MaxRuntime, selected_genres):
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjJlZjM0MWRhOWM1NTM3ZThmOGRlNzA0ZDJhM2M2ZiIsIm5iZiI6MTczMzQyNzUyMS44NjcsInN1YiI6IjY3NTIwMTQxYWIzN2ZjZDNlODg1MTMzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iVq091IX6ZNnQeht3EhzNOotU61iFU8mcyFq7a2INQQ"
        #passar para um arquivo de configuração depois
    }    
    base = {"title_pt": [], "title_en": [], "overview": [], "runtime": [], "poster_path": [], "director": [], "review": []}
    
    id_filmes = get_movie_ids(films_lists, headers)
    selected_genres_id = get_genre_ids(selected_genres, headers)
    
    for film_id in id_filmes:
        try:
            response = requests.get(f"https://api.themoviedb.org/3/movie/{film_id}?language=pt-BR", headers=headers)
            response.raise_for_status()
            movie = response.json()
            
            if not movie.get("overview") or not any(g["id"] in selected_genres_id for g in movie.get("genres", [])):
                continue
            
            if movie.get("runtime", 0) > MaxRuntime + 10:
                continue
            
            base["title_pt"].append(movie["title"])
            base["title_en"].append(movie["original_title"])
            base["overview"].append(movie["overview"])
            base["runtime"].append(movie.get("runtime", 0))
            base["poster_path"].append(movie.get("poster_path"))
            base["review"].append(str(movie.get("vote_average", "N/A")))
            base["director"].append(get_director(film_id, headers))
        
        except requests.exceptions.RequestException as e:
            print(f"Erro ao processar filme ID {film_id}: {e}")
    
    return base
