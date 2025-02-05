from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from utils import IntegracaoAPI
from utils import BancoFilmes

app = Flask(__name__)
CORS(app)

chave = None
tempo = None
generos = None
classificacao = None

@app.route("/")
def home():
    return "<h1>Deu tudo certo</h1>"

@app.route("/api/receber_chave", methods=["POST"])
def receber_chave():
    global chave  # Use uma variável global para armazenar o valor
    data = request.json  # Recebe o JSON enviado pelo frontend
    chave = data.get("key")  # Atualiza o valor de tempo globalmente
    print(f"Chave recebida: {chave}")  # Debug: imprime o valor recebido
    return jsonify({"message": "Tempo recebido com sucesso!", "chave": chave})

@app.route("/api/tempo", methods=["POST"])
def receber_tempo():
    global tempo  # Use uma variável global para armazenar o valor
    data = request.json  # Recebe o JSON enviado pelo frontend
    time = data.get("time")  # Extrai o valor do tempo
    tempo = time  # Atualiza o valor de tempo globalmente
    print(f"Tempo recebido: {tempo}")  # Debug: imprime o valor recebido
    return jsonify({"message": "Chave recebida com sucesso!", "time": tempo})

@app.route("/api/selecionar_generos", methods=["POST"])
def selecionar_generos():
    global generos  # Armazenar os gêneros globalmente
    data = request.json
    generos = data.get("selectedGenres")
    
    if generos and len(generos) == 3:
        print(f"Gêneros recebidos: {generos}")
        return jsonify({"message": "Gêneros recebidos com sucesso", "selectedGenres": generos}), 200
    else:
        return jsonify({"error": "Selecione exatamente 3 gêneros"}), 400
    
# Rota para receber dados do frontend
@app.route("/api/selecionar_classificacao", methods=["POST"])
def receber_classificacao():
    global classificacao  # Para atualizar a variável global
    data = request.json  # Recebe os dados enviados no body da requisição
    classificacao = data.get("botaoClicado")  # Obtém o valor do botão clicado
    if classificacao:
        print(f"Classificacao recebida: {classificacao}")
        return jsonify({"message": "Classificação recebida com sucesso!", "classificacao": classificacao}), 200
    else:
        return jsonify({"error": "Classificação não enviada!"}), 400

@app.route("/processar-filmes", methods=["GET"])
def processar_filmes():
    global classificacao, tempo, generos, data_dict_global

    # Verifique se todos os dados necessários estão presentes
    if not classificacao or not tempo or not generos:
        return jsonify({"error": "Faltando dados: classificação, tempo ou gêneros."}), 400

    # Caso todos os dados estejam presentes, processa os filmes
    try: 
        generos = ', '.join(generos)
        # Assegure-se de que a função call_openai e collecting_data sejam chamadas corretamente
        print(f"Processando filmes com os dados: classificação={classificacao}, tempo={tempo}, gêneros={generos}")
        data_dict = BancoFilmes.collecting_data(
            IntegracaoAPI.call_openai(chave, generos, tempo, classificacao), int(tempo)
        )

        data_dict_global = data_dict
        
        # Adiciona um campo `processamento_concluido` para informar o frontend
        return jsonify({
            "data_dict": data_dict,
            "processamento_concluido": True  # Indica que o processamento foi bem-sucedido
        }), 200

    except Exception as e:
        # Adiciona mais detalhes no log para diagnóstico
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
    else:
        return jsonify({
            "error": "Os filmes ainda não foram processados. Execute /processar-filmes primeiro."
        }), 400


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, port=5000)
