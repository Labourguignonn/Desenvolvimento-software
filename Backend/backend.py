import Backend.api_banco_de_dados as api_banco_de_dados
import Backend.IntegracaoAPI as IntegracaoAPI

chave = input()
tempo = input()
genero = input()
classificacao = input()

data_dict,films_list = api_banco_de_dados.collecting_data(IntegracaoAPI.call_openai(chave, genero, tempo, classificacao), int(tempo))


