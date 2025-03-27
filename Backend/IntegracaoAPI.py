import openai

# Modifiquei a saida da função para retornar um set de filmes, o(n) para o(1)
def call_openai(key, genre, runtime, rating, watched_movies, selected_movies):
    openai.api_key = key

    #mensagem pra API
    mensagens = [
        {'role': 'system', 'content': 'You are a movie critic giving reccomendations'},
        {'role': 'user', 'content': f'Return, without numbers and separated by semicolons, only the title of 5 movies of the genre {genre}, that has a {rating} rating or less, with at most {runtime} of runtime'}
    ]

    #Config. Resposta do GPT
    resposta = openai.ChatCompletion.create(
        model='gpt-4o-mini',
        messages=mensagens,
        max_tokens=100,
        temperature=0.7,
    )

    mensagem_resp = resposta['choices'][0]['message']['content'].strip()
    films_set = {film.strip() for film in mensagem_resp.split(";")} - {"Anora", "Emilia Pérez"} - watched_movies - selected_movies
    
    return films_set

def call_openai_extra(key, genre, runtime, rating, existing_movies, watched_movies, selected_movies):
    openai.api_key = key

    # Criar mensagem para evitar filmes repetidos
    mensagens = [
        {'role': 'system', 'content': 'You are a movie critic giving recommendations'},
        {'role': 'user', 'content': f'Return, without numbers and separated by semicolons, only {5 - len(existing_movies)} new movie titles of the genre {genre}, that has a {rating} rating or less, with at most {runtime} minutes of runtime. Do NOT repeat any of these movies: {", ".join(existing_movies)}' }
    ]

    # Send message to the API
    resposta = openai.ChatCompletion.create(
        model='gpt-4o-mini',
        messages=mensagens,
        max_tokens=100,
        temperature=0.7,
    )

    # String to set
    mensagem_resp = resposta['choices'][0]['message']['content']
    print(mensagem_resp)
    new_films = {film.strip() for film in mensagem_resp.split(";")}

    complete_movies_set = existing_movies | (new_films - {"Anora", "Emilia Pérez"} - watched_movies - selected_movies)
 
    return complete_movies_set

