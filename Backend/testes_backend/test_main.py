import pytest
import sys
import os
from flask import Flask, jsonify, request
from unittest.mock import patch

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from main import app

@pytest.fixture
def client():
    """Fixture para criar um cliente de teste do Flask."""
    with app.test_client() as client:
        yield client

def test_getSelectedRating_success(client):
    # Dados de entrada (simulando o JSON que será enviado)
    data = {"botaoClicado": "R"}

    # Enviar a requisição POST
    response = client.post("/selecionar_classificacao", json=data)

    # Verificar se o status da resposta é 200
    assert response.status_code == 200
    # Verificar o conteúdo da resposta
    json_data = response.get_json()
    assert json_data["message"] == "Classificação recebida com sucesso!"
    assert json_data["classificação"] == "R"

def test_getSelectedRating_failure(client):
    # Enviar a requisição POST com um JSON vazio (sem 'botaoClicado')
    data = {}

    response = client.post("/selecionar_classificacao", json=data)

    # Verificar se o status da resposta é 400
    assert response.status_code == 400
    # Verificar o conteúdo da resposta
    json_data = response.get_json()
    assert json_data["error"] == "Classificação não enviada!"

def test_process_movies_success1(client):
    global selected_rating, selected_runtime, selected_genres

    # Definindo valores para as variáveis globais
    selected_rating = "PG"
    selected_runtime = "120"
    selected_genres = ["action", "comedy"]

    # Mockando as funções externas
    with patch('BancoFilmes.collecting_data') as mock_collecting_data, \
         patch('IntegracaoAPI.call_openai') as mock_call_openai, \
         patch('IntegracaoAPI.call_openai_extra') as mock_call_openai_extra:

        # Mock de retorno das funções
        mock_collecting_data.return_value = {"title_en": ["Movie 1", "Movie 2"]}
        mock_call_openai.return_value = ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"]
        mock_call_openai_extra.return_value = ["Movie 1", "Movie 2", "Movie 6", "Movie 7", "Movie 8"]

        # Chamada para o endpoint
        response = client.get("/processar-filmes")

        # Verificar a resposta
        assert response.status_code == 200
        json_data = response.get_json()
        assert "data_dict" in json_data 
        assert json_data["processamento_concluido"] is True

def test_process_movies_success2(client):
    global selected_rating, selected_runtime, selected_genres

    # Definindo valores para as variáveis globais
    selected_rating = "PG-13"
    selected_runtime = "150"
    selected_genres = ["romance", "action"]

    # Mockando as funções externas
    with patch('BancoFilmes.collecting_data') as mock_collecting_data, \
         patch('IntegracaoAPI.call_openai') as mock_call_openai, \
         patch('IntegracaoAPI.call_openai_extra') as mock_call_openai_extra:

        # Mock de retorno das funções
        mock_collecting_data.return_value = {"title_en": ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"]}
        mock_call_openai.return_value = ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"]

        # Chamada para o endpoint
        response = client.get("/processar-filmes")

        # Verificar a resposta
        assert response.status_code == 200
        json_data = response.get_json()
        assert "data_dict" in json_data
        assert json_data["processamento_concluido"] is True

        # Verificar que a função call_openai_extra não foi chamada
        mock_call_openai_extra.assert_not_called()

# Teste: Quando dados estão faltando (classificação)
def test_process_movies_missing_data(client):
    global selected_rating, selected_runtime, selected_genres

    # Falta de dados (não definindo selected_rating)
    selected_rating = None
    selected_runtime = "120"
    selected_genres = ["action", "comedy"]

    response = client.get("/processar-filmes")

    assert response.status_code == 400
    json_data = response.get_json()
    assert json_data["error"] == "Faltando dados: classificação, tempo ou gêneros."

# Teste: Quando dados estão faltando (tempo)
def test_process_movies_missing_runtime(client):
    global selected_rating, selected_runtime, selected_genres

    # Falta de dados (não definindo selected_runtime)
    selected_rating = "PG"
    selected_runtime = None
    selected_genres = ["action", "comedy"]

    response = client.get("/processar-filmes")

    assert response.status_code == 400
    json_data = response.get_json()
    assert json_data["error"] == "Faltando dados: classificação, tempo ou gêneros."

# Teste: Quando dados estão faltando (gêneros)
def test_process_movies_missing_genres(client):

    # Falta de dados (não definindo selected_genres)
    selected_rating = "PG"
    selected_runtime = "120"
    selected_genres = None

    response = client.get("/processar-filmes")

    assert response.status_code == 400
    json_data = response.get_json()
    assert json_data["error"] == "Faltando dados: classificação, tempo ou gêneros."

# Teste: Quando ocorre um erro na execução (por exemplo, erro na API ou no banco de dados)
def test_process_movies_internal_error(client):

    selected_rating = "PG"
    selected_runtime = "120"
    selected_genres = ["action", "comedy"]

    # Simulando um erro na função IntegracaoAPI.call_openai
    with patch('IntegracaoAPI.call_openai', side_effect=Exception("Erro ao chamar a API")):
        response = client.get("/processar-filmes")

    assert response.status_code == 500
    json_data = response.get_json()
    assert "error" in json_data
    assert json_data["error"] == "Erro ao processar filmes: Erro ao chamar a API"

def test_send_movies_success(client):

    # Definindo um valor para data_dict_global com todas as chaves necessárias
    data_dict_global = {
        "title_pt": ["Filme 1", "Filme 2"],
        "title_en": ["Movie 1", "Movie 2"],
        "overview": ["Resumo 1", "Resumo 2"],
        "runtime": [120, 130],
        "poster_path": ["path1.jpg", "path2.jpg"],
        "director": ["Diretor 1", "Diretor 2"],
        "review": ["Ótimo", "Bom"]
    }

    # Chamada para o endpoint
    response = client.get("/entregar-filmes")

    # Verificar a resposta
    assert response.status_code == 200
    json_data = response.get_json()
    assert "data_dict" in json_data
    assert json_data["data_dict"] == data_dict_global


def test_send_movies_failure_no_data(client):
    # Garantir que data_dict_global seja None
    data_dict_global = None

    # Chamada para o endpoint
    response = client.get("/entregar-filmes")

    # Verificar a resposta
    assert response.status_code == 400
    json_data = response.get_json()
    assert "error" in json_data
    assert json_data["error"] == "Os filmes ainda não foram processados. Execute processar_filmes primeiro."

def test_send_movies_failure_missing_keys(client):

    # Definindo um valor para data_dict_global com chaves faltando
    data_dict_global = {
        "title_en": ["Movie 1", "Movie 2"],  # Falta "title_pt", "overview", etc.
        "overview": ["Resumo 1", "Resumo 2"],
        "runtime": [120, 130]
    }

    # Chamada para o endpoint
    response = client.get("/entregar-filmes")

    # Verificar a resposta
    assert response.status_code == 400
    json_data = response.get_json()
    assert "error" in json_data
    assert "Chaves ausentes" in json_data["error"]
