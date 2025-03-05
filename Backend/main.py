from flask import Flask, request, jsonify
from flask_cors import CORS
from dataclasses import dataclass
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))
import IntegracaoAPI
import BancoFilmes
import crud

@dataclass
class MovieAPI:
    api_key: str = None
    selected_runtime: str = None
    selected_genres: list = None  
    selected_rating: str = None
    data_dict: dict = None

    def process_movies(self):
        if any(value is None for value in [self.api_key, self.selected_rating, self.selected_runtime, self.selected_genres]):
            return {f"error": "Faltando dado {value}"}, 400

        try:
            selected_genres_str = ', '.join(self.selected_genres) if isinstance(self.selected_genres, list) else self.selected_genres
            print(f"Processando filmes com classificação={self.selected_rating}, tempo={self.selected_runtime}, gêneros={selected_genres_str}")

            self.data_dict = BancoFilmes.collecting_data(
                IntegracaoAPI.call_openai(self.api_key, selected_genres_str, self.selected_runtime, self.selected_rating),
                int(self.selected_runtime),
                selected_genres_str
            )

            max_attempts = 3
            attempts = 0
            
            while len(self.data_dict["title_en"]) < 5 and attempts < max_attempts:
                print(f"Refatorando lista de filmes. Tentativa {attempts + 1}/{max_attempts}")
                refactored_movies_set = IntegracaoAPI.call_openai_extra(
                    self.api_key, selected_genres_str, self.selected_runtime, self.selected_rating, set(self.data_dict["title_en"])
                )

                if not refactored_movies_set or not isinstance(refactored_movies_set, set):
                    print("Erro: Lista de filmes extra vazia ou inválida. Parando tentativas adicionais.")
                    break  

                self.data_dict = BancoFilmes.collecting_data(refactored_movies_set, int(self.selected_runtime), selected_genres_str)
                attempts += 1

            return {"data_dict": self.data_dict, "processamento_concluido": True}, 200

        except Exception as e:
            print(f"Erro ao processar filmes: {str(e)}")
            return {"error": f"Erro ao processar filmes: {str(e)}", "processamento_concluido": False}, 500

    def send_movies(self):
        base_keys = ["title_pt", "title_en", "overview", "runtime", "poster_path", "director", "review"]

        if not isinstance(self.data_dict, dict):
            return {"error": "Os filmes ainda não foram processados. Execute processar-filmes primeiro."}, 400

        missing_keys = [key for key in base_keys if key not in self.data_dict]
        if missing_keys:
            return {"error": f"O dicionário retornado está incompleto. Chaves ausentes: {missing_keys}"}, 400

        return {"data_dict": self.data_dict}, 200


# Instância da classe
movie_api = MovieAPI()
app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "<h1>Deu tudo certo</h1>"

@app.route("/receber_chave", methods=["POST"])
def get_api_key():
    key = request.json.get("key")
    if key:
        movie_api.api_key = key
        return jsonify({"message": "Chave recebida com sucesso!", "chave": key})
    return jsonify({"error": "Escolha uma chave para acessar a OpenAI API"}), 400

@app.route("/tempo", methods=["POST"])
def get_selected_runtime():
    runtime = request.json.get("time")
    if runtime:
        movie_api.selected_runtime = runtime
        return jsonify({"message": "Tempo recebido com sucesso!", "time": runtime})
    return jsonify({"error": "Escolha uma duração máxima para seu filme"}), 400

@app.route("/selecionar_generos", methods=["POST"])
def get_selected_genres():
    genres = request.json.get("selectedGenres")
    movie_api.selected_genres = request.json.get("selectedGenres")
    if movie_api.selected_genres:
        return jsonify({"message": "Gêneros recebidos com sucesso", "selectedGenres": genres}), 200
    return jsonify({"error": "Selecione de 1 a 3 gêneros"}), 400

@app.route("/selecionar_classificacao", methods=["POST"])
def get_selected_rating():
    rating = request.json.get("botaoClicado")
    if rating:
        movie_api.selected_rating = rating
        return jsonify({"message": "Classificação recebida com sucesso!", "classificação": rating}), 200
    return jsonify({"error": "Classificação não enviada!"}), 400

@app.route("/processar-filmes", methods=["GET"])
def process_movies():
    response, status = movie_api.process_movies()
    return jsonify(response), status

@app.route("/entregar-filmes", methods=["GET"])
def send_movies():
    response, status = movie_api.send_movies()
    return jsonify(response), status

@app.route("/registrar-usuario", methods=["POST"])
def register_user():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Os parâmetros 'username' e 'password' são obrigatórios!"}), 400

    resultado = crud.inserir_usuario(username, password)
    return jsonify(resultado)

@app.route("/verificar-usuario", methods=["GET"])
def verify_user():
    username = request.args.get("username")

    if not username:
        return jsonify({"error": "O parâmetro 'username' é obrigatório!"}), 400

    resultado = crud.buscar_usuario(username)
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
    app.run(debug=True, port=port)
