from fastapi import FastAPI
import Backend.api_banco_de_dados as api_banco_de_dados
import Backend.IntegracaoAPI as IntegracaoAPI

app = FastAPI()

#  chave = 
#  tempo = input()
#  genero = input()
#  classificacao = input()

@app.get("/")
def home():
    return {"message": "Minha API FastAPI está no ar!"}

@app.get("/filtro_tempo")
def filtro_tempo():
    return {"message": "Oi"}

@app.get("/filtro_genero")
def filtro_genero():
    return {"message": "Oi"}

@app.get("/filtro_classificacao")
def filtro_classificacao():
    return {"message": "Tchau"}

@app.get("/selecao")
def selecao():
    return {"message": "Oi"}

@app.get("/carregamento")
def carregamento():
    return {"message": "Oi"}

@app.get("/escolha")
def escolha():
    return {"message": "Oi"}


##data_dict,films_list = api_banco_de_dados.collecting_data(IntegracaoAPI.call_openai(chave, genero, tempo, classificacao), int(tempo))

if __name__ == "__main__": 
    import uvicorn 
    uvicorn.run(app, host="0.0.0.0", port=8000)