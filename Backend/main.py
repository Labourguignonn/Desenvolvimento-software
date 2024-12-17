import Backend.api_banco_de_dados as api_banco_de_dados
import Backend.IntegracaoAPI as IntegracaoAPI

chave = "xx"
tempo = "1h30"
genero = "romance"
classificacao = "16"

##data_dict,films_list = api_banco_de_dados.collecting_data(IntegracaoAPI.call_openai(chave, genero, tempo, classificacao), int(tempo))
