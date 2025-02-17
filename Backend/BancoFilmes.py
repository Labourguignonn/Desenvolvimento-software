import requests
import re

def collecting_data(films_lists, MaxRuntime, selected_genres):
    headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjJlZjM0MWRhOWM1NTM3ZThmOGRlNzA0ZDJhM2M2ZiIsIm5iZiI6MTczMzQyNzUyMS44NjcsInN1YiI6IjY3NTIwMTQxYWIzN2ZjZDNlODg1MTMzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iVq091IX6ZNnQeht3EhzNOotU61iFU8mcyFq7a2INQQ"
    }

    base = {"title_pt": [], "title_en": [],  "overview": [], "runtime": [], "poster_path": [], "director": [], "review": []}
    id_filmes = []
    
    #Conferir se filmes repetidos foram fornecidos
    for filme in films_lists:
        if films_lists.count(filme) > 1:
            films_lists.remove(filme)


    # Pegar o ID de cada filme
    for film in films_lists:
        search = re.sub(' ', '%20', film.lower())
        url = f"https://api.themoviedb.org/3/search/movie?query={search}&include_adult=false&language=en-US&page=1"
        
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            results = response.json().get("results", [])
            
            if results:
                id_filmes.append(results[0]["id"])
        except requests.exceptions.RequestException as e:
            print(f"Erro ao buscar {film}: {e}")
            continue

    # Pegar os IDs dos gêneros selecionados
    try:
        genre_response = requests.get("https://api.themoviedb.org/3/genre/movie/list?language=en", headers=headers)
        genre_response.raise_for_status()
        genres_list = genre_response.json().get("genres", [])
        
        selected_genres_id = [genre["id"] for genre in genres_list if genre["name"] in selected_genres]
    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar gêneros: {e}")
        return base

    # Buscar dados dos filmes
    for i, film_id in enumerate(id_filmes):
        try:
            movie_url = f"https://api.themoviedb.org/3/movie/{film_id}?language=pt-BR"
            movie_response = requests.get(movie_url, headers=headers)
            movie_response.raise_for_status()
            movie_data = movie_response.json()

            if movie_data["overview"] == "":
                continue

            # Validar gênero
            movie_genres = [g["id"] for g in movie_data.get("genres", [])]
            if not any(g in selected_genres_id for g in movie_genres):
                continue

            # Validar tempo de execução
            runtime = movie_data.get("runtime", 0)
            if runtime > MaxRuntime + 10:
                continue
            
            base["title_pt"].append(movie_data["title"])
            base["overview"].append(movie_data["overview"])
            base["runtime"].append(runtime)
            base["poster_path"].append(movie_data["poster_path"])
            base["review"].append(f"{str(movie_data.get("vote_average", "N/A")):.2f}")
            base["title_en"].append(movie_data["original_title"])

            # Buscar diretor
            credits_url = f"https://api.themoviedb.org/3/movie/{film_id}/credits?language=en-US"
            credits_response = requests.get(credits_url, headers=headers)
            credits_response.raise_for_status()
            
            director_name = "Unknown"
            for crew in credits_response.json().get("crew", []):
                if crew["job"] == "Director":
                    director_name = crew["name"]
                    break
            base["director"].append(director_name)

        except requests.exceptions.RequestException as e:
            print(f"Erro ao processar filme ID {film_id}: {e}")
            continue

    return base
