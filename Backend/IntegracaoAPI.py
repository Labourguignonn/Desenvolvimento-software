import openai

def call_openai(key, genre, runtime, rating):
    openai.api_key = key

    #mensagem pra API
    mensagens = [
        {'role': 'system', 'content': 'Você é um indicador de filmes.'},
        {'role': 'user', 'content': f'Retorne, sem números e separados com ponto e vírgula, apenas o título de 5 filmes do gênero {genre}, classificação indicativa {rating} ou menor, de no máximo {runtime} de duração'}
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
