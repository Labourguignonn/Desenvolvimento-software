from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import sys
import os

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import IntegracaoAPI
import BancoFilmes
import crud

api_key = None
selected_runtime = None
selected_genres = None
selected_runtime = None
data_dict_global = None

app = Flask(__name__)
CORS(app)

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
    
    if isinstance(selected_genres, list) and len(selected_genres) <= 3 and len(selected_genres) > 0:
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
def process_movies():
    global selected_rating, selected_runtime, selected_genres, data_dict_global

    if selected_rating is None or selected_runtime is None or not selected_genres:
        return jsonify({"error": "Faltando dados: classificação, tempo ou gêneros."}), 400

    try:
        if isinstance(selected_genres, list) and len(selected_genres) > 1:
            selected_genres = ', '.join(selected_genres)

        print(f"Processando filmes com os dados: classificação={selected_rating}, tempo={selected_runtime}, gêneros={selected_genres}")

        # Chamada inicial para obter filmes
        data_dict = BancoFilmes.collecting_data(
            IntegracaoAPI.call_openai(api_key, selected_genres, selected_runtime, selected_rating), int(selected_runtime), selected_genres
        )

        max_attempts = 3
        attempts = 0

        while len(data_dict["title_en"]) < 5 and attempts < max_attempts:

            refactored_movies_list = IntegracaoAPI.call_openai_extra(
                api_key, selected_genres, selected_runtime, selected_rating, data_dict["title_en"]
            )

            # Verifica se `refactored_movies_list` tem algum dado válido
            if not refactored_movies_list or not isinstance(refactored_movies_list, list):
                print("Erro: Lista de filmes extra vazia ou inválida. Parando tentativas adicionais.")
                break  # Sai do loop se a resposta for inválida

            novos_filmes_dict = BancoFilmes.collecting_data(refactored_movies_list, int(selected_runtime), selected_genres)

            attempts += 1

        data_dict_global = data_dict  # Salva o resultado final

        return jsonify({
            "data_dict": data_dict_global,
            "processamento_concluido": True
        }), 200

    except Exception as e:
        print(f"Erro ao processar filmes: {str(e)}")
        return jsonify({
            "error": f"Erro ao processar filmes: {str(e)}",
            "processamento_concluido": False
        }), 500

        
@app.route("/entregar-filmes", methods=["GET"])
def send_movies():
    global data_dict_global

    base = {"title_pt": [], "title_en": [], "overview": [], "runtime": [], "poster_path": [], "director": [], "review": []}

    if not isinstance(data_dict_global, dict):
        return jsonify({
            "error": "Os filmes ainda não foram processados. Execute processar-filmes primeiro."
        }), 400

    missing_keys = [key for key in base.keys() if key not in data_dict_global]
    
    if missing_keys:
        return jsonify({
            "error": f"O dicionário retornado está incompleto. Chaves ausentes: {missing_keys}"
        }), 400

    return jsonify({
        "data_dict": data_dict_global
    }), 200

@app.route("/registrar-usuario", methods=["POST"])
def register_user():
    data = request.json  # Captura os dados do corpo da requisição
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Os parâmetros 'username' e 'password' são obrigatórios!"}), 400

    resultado = crud.inserir_usuario(username, password)
    return jsonify(resultado)

@app.route("/verificar-usuario", methods=["GET"])
def verify_user():
    username = request.args.get("username")  # Captura o parâmetro via URL
    print(f"Verificando usuário: {username}")  # Depuração

    if not username:
        return jsonify({"error": "O parâmetro 'username' é obrigatório!"}), 400

    resultado = crud.buscar_usuario(username)
    print(f"Resultado da busca: {resultado}")  # Depuração

    return jsonify(resultado)

@app.route("/verificar-login", methods=["POST"])
def verify_login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Os parâmetros 'username' e 'password' são obrigatórios!"}), 400

    resultado = crud.buscar_login(username, password)
    return jsonify(resultado)

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, port=5000)