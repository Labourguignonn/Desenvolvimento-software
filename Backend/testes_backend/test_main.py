import pytest
import sys
import os
from flask import Flask, jsonify, request
from unittest.mock import patch

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from main import app
from main import movie_api

@pytest.fixture
def client():
    """Fixture para criar um cliente de teste do Flask."""
    with app.test_client() as client:
        yield client

import pytest
from unittest.mock import patch
from main import movie_api

def test_getSelectedRating_success(client):
    # Dados de entrada
    data = {"selectedRating": "R"}

    response = client.post("/selecionar_filtros", json=data)

    assert response.status_code == 200
    json_data = response.get_json()
    assert json_data["message"] == "Filtros recebidos com sucesso!"
    assert json_data["classificação"] == "R"

def test_getSelectedRating_failure(client):
    data = {}  # Falta selectedRating

    response = client.post("/selecionar_filtros", json=data)

    assert response.status_code == 400
    json_data = response.get_json()
    assert json_data["error"] == "Classificação não enviada!"

def test_process_movies_success1(client):
    # Definir os filtros antes de chamar a rota
    movie_api.user = "teste_user"
    movie_api.selected_rating = "PG"
    movie_api.selected_runtime = "120"
    movie_api.selected_genres = ["action", "comedy"]

    with patch('BancoFilmes.collecting_data') as mock_collecting_data, \
         patch('IntegracaoAPI.call_openai') as mock_call_openai, \
         patch('IntegracaoAPI.call_openai_extra') as mock_call_openai_extra:

        mock_collecting_data.return_value = {"title_en": ["Movie 1", "Movie 2"]}
        mock_call_openai.return_value = ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"]
        mock_call_openai_extra.return_value = ["Movie 1", "Movie 2", "Movie 6", "Movie 7", "Movie 8"]

        response = client.get("/processar-filmes")

        assert response.status_code == 200
        json_data = response.get_json()
        assert "data_dict" in json_data 
        assert json_data["processamento_concluido"] is True

def test_process_movies_missing_data(client):
    movie_api.user = "teste_user"
    movie_api.selected_rating = None  # Falta classificação
    movie_api.selected_runtime = "120"
    movie_api.selected_genres = ["action", "comedy"]

    response = client.get("/processar-filmes")

    assert response.status_code == 400
    json_data = response.get_json()
    assert "Faltando dado" in json_data["error"]

def test_send_movies_success(client):
    movie_api.data_dict = {
        "title_pt": ["Filme 1", "Filme 2"],
        "title_en": ["Movie 1", "Movie 2"],
        "overview": ["Resumo 1", "Resumo 2"],
        "runtime": [120, 130],
        "poster_path": ["path1.jpg", "path2.jpg"],
        "director": ["Diretor 1", "Diretor 2"],
        "review": ["Ótimo", "Bom"]
    }

    response = client.get("/entregar-filmes")

    assert response.status_code == 200
    json_data = response.get_json()
    assert "data_dict" in json_data
    assert json_data["data_dict"] == movie_api.data_dict

def test_send_movies_failure_no_data(client):
    movie_api.data_dict = None  # Garantir que esteja vazio

    response = client.get("/entregar-filmes")

    assert response.status_code == 400
    json_data = response.get_json()
    assert "Os filmes ainda não foram processados" in json_data["error"]

def test_send_movies_failure_missing_keys(client):
    movie_api.data_dict = {
        "title_en": ["Movie 1", "Movie 2"],  # Faltam várias chaves
        "overview": ["Resumo 1", "Resumo 2"],
        "runtime": [120, 130]
    }

    response = client.get("/entregar-filmes")

    assert response.status_code == 400
    json_data = response.get_json()
    assert "Chaves ausentes" in json_data["error"]
