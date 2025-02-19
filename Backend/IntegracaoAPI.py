import openai

def call_openai(key, genre, runtime, rating):
    openai.api_key = key

    #mensagem pra API
    mensagens = [
        {'role': 'system', 'content': 'You are a movie critic giving reccomendations'},
        {'role': 'user', 'content': f'Return, without numbers and separated by semicolons, only the title of 5 movies of the genre {genre}, that has a {rating} rating or less, with at most {runtime} of runtime'}
    ]

    ##Config. Resposta do GPT
    resposta = openai.ChatCompletion.create(
        model='gpt-4o-mini',
        messages=mensagens,
        max_tokens=100,
        temperature=0.7,
    )

    #Text to list
    mensagem_resp = resposta['choices'][0]['message']['content']
    films_list = mensagem_resp.split(";")

    return films_list

def call_openai_extra(key, genre, runtime, rating, existing_movies):
    openai.api_key = key

    # Criar mensagem para evitar filmes repetidos
    mensagens = [
        {'role': 'system', 'content': 'You are a movie critic giving recommendations'},
        {'role': 'user', 'content': f'Return, without numbers and separated by semicolons, only {5 - len(existing_movies)} new movie titles of the genre {genre}, that has a {rating} rating or less, with at most {runtime} minutes of runtime. Do NOT repeat any of these movies: {", ".join(existing_movies)}' }
    ]

    # Chamar OpenAI
    resposta = openai.ChatCompletion.create(
        model='gpt-4o-mini',
        messages=mensagens,
        max_tokens=100,
        temperature=0.7,
    )

    # Converter texto para lista
    mensagem_resp = resposta['choices'][0]['message']['content']
    new_films = [film.strip() for film in mensagem_resp.split(";")]

    # Filtrar os filmes existentes da lista de novos filmes
    filtered_new_films = [film for film in new_films if film not in existing_movies]

    # Combinar filmes existentes com novos filmes
    complete_movies_list = existing_movies + filtered_new_films

    return complete_movies_list

