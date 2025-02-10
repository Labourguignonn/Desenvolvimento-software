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
