from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import IntegracaoAPI
import BancoFilmes

app = Flask(__name__)
CORS(app)

api_key = None
selected_runtime = None 
selected_genres = None
selected_rating = None

@app.route("/")
def home():
    return "<h1>Deu tudo certo</h1>"

@app.route("/receber_chave", methods=["POST"])
def getApiKey():
    global api_key 
    api_key = (request.json ).get("key")  
    if api_key:
        return jsonify({"message": "Chave recebido com sucesso!", "chave": api_key})
    return jsonify({"error": "Escolha uma chave para acessar a OpenAI API"}), 400

@app.route("/tempo", methods=["POST"])
def getSelectedRuntime():
    global selected_runtime  
    selected_runtime = (request.json).get("time")  
    if selected_runtime:
        return jsonify({"message": "Tempo recebida com sucesso!", "time": selected_runtime})
    return jsonify({"error": "Escolha uma duração máxima para seu filme"}), 400
     
@app.route("/selecionar_generos", methods=["POST"])
def getSelectedGenres():
    global selected_genres
    selected_genres = (request.json).get("selectedGenres")
    
    if selected_genres and len(selected_genres) <= 3 and len(selected_genres) > 0:
        return jsonify({"message": "Gêneros recebidos com sucesso", "selectedGenres": selected_genres}), 200
    
    return jsonify({"error": "Selecione de 1 a 3 gêneros"}), 400
    
@app.route("/selecionar_classificacao", methods=["POST"])
def getSelectedRating():
    global selected_rating 
    
    selected_rating = (request.json).get("botaoClicado")  
    if selected_rating:
        return jsonify({"message": "Classificação recebida com sucesso!", "classificação": selected_rating}), 200
    
    return jsonify({"error": "Classificação não enviada!"}), 400

@app.route("/processar-filmes", methods=["GET"])
def processar_filmes():
    global selected_rating, selected_runtime, selected_genres, data_dict_global
    time.sleep(1.5)

# Verifique se todos os dados necessários estão presentes
    if not selected_rating or not selected_runtime or not selected_genres:
        return jsonify({"error": "Faltando dados: classificação, tempo ou gêneros."}), 400

    # Caso todos os dados estejam presentes, processa os filmes
    try: 
        selected_genres = ', '.join(selected_genres)
        # Assegure-se de que a função call_openai e collecting_data sejam chamadas corretamente
        print(f"Processando filmes com os dados: classificação={selected_rating}, tempo={selected_runtime}, gêneros={selected_genres}")
        data_dict = BancoFilmes.collecting_data(
            IntegracaoAPI.call_openai(api_key, selected_genres, selected_runtime, selected_rating), int(selected_runtime)
        )
        print(data_dict)
        data_dict_global = data_dict
        
        return jsonify({
            "data_dict": data_dict,
            "processamento_concluido": True  # Indica que o processamento foi bem-sucedido
        }), 200

    except Exception as e:
        print(f"Erro ao processar filmes: {str(e)}")
        return jsonify({
            "error": f"Erro ao processar filmes: {str(e)}",
            "processamento_concluido": False  # Se ocorrer erro, também retorna False
        }), 500
        
@app.route("/entregar-filmes", methods=["GET"])
def entregar_filmes():
    global data_dict_global

    # Verifica se o data_dict_global já foi gerado
    if data_dict_global:
        return jsonify({
            "data_dict": data_dict_global
        }), 200
        
    return jsonify({
        "error": "Os filmes ainda não foram processados. Execute processar_filmes primeiro."
    }), 400


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, port=5000)