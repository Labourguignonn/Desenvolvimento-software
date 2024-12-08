import openai

# Definindo a chave por input no código

print("Digite sua chave da OpenAI:")
openai.api_key = input()

#variáveis
genero_filme = input()
tempo_maximo = input()
classific_indic = input() ##L, 12, 14, 16, 18


#mensagem pra API
mensagens = [
    {'role': 'system', 'content': 'Você é um indicador de filmes.'},
    {'role': 'user', 'content': f'Retorne, sem números e separados com ponto e vírgula, apenas o título de 5 filmes do gênero {genero_filme}, classificação indicativa {classific_indic} ou menor, de no máximo {tempo_maximo} de duração'}
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

print(films_list)
