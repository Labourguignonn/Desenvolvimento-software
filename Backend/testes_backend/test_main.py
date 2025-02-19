import pytest
import sys
import os
from flask import Flask, jsonify, request

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

def test_getSelectedGenres_success(client):
    # Dados de entrada (simulando o JSON que será enviado)
    data = {"selectedGenres": ["Action", "Comedy"]}

    # Enviar a requisição POST
    response = client.post("/selecionar_generos", json=data)

    # Verificar se o status da resposta é 200
    assert response.status_code == 200
    # Verificar o conteúdo da resposta
    json_data = response.get_json()
    assert json_data["message"] == "Gêneros recebidos com sucesso"
    assert json_data["selectedGenres"] == ["Action", "Comedy"]

def test_getSelectedGenres_failure(client):
    # Enviar a requisição POST com um JSON vazio (sem 'selectedGenres')
    data = {}

    response = client.post("/selecionar_generos", json=data)

    # Verificar se o status da resposta é 400
    assert response.status_code == 400
    # Verificar o conteúdo da resposta
    json_data = response.get_json()
    assert json_data["error"] == "Selecione de 1 a 3 gêneros"

def test_getSelectedRuntime_success(client):
    # Dados de entrada (simulando o JSON que será enviado)
    data = {"time": 120}

    # Enviar a requisição POST
    response = client.post("/tempo", json=data)

    # Verificar se o status da resposta é 200
    assert response.status_code == 200
    # Verificar o conteúdo da resposta
    json_data = response.get_json()
    assert json_data["message"] == "Tempo recebida com sucesso!"
    assert json_data["time"] == 120

def test_getSelectedRuntime_failure(client):
    # Enviar a requisição POST com um JSON vazio (sem 'time')
    data = {}

    response = client.post("/tempo", json=data)

    # Verificar se o status da resposta é 400
    assert response.status_code == 400
    # Verificar o conteúdo da resposta
    json_data = response.get_json()
    assert json_data["error"] == "Escolha uma duração máxima para seu filme"

def test_getApiKey_success(client):
    # Dados de entrada (simulando o JSON que será enviado)
    data = {"key": "fake-key"}

    # Enviar a requisição POST
    response = client.post("/receber_chave", json=data)

    # Verificar se o status da resposta é 200
    assert response.status_code == 200
    # Verificar o conteúdo da resposta
    json_data = response.get_json()
    assert json_data["message"] == "Chave recebido com sucesso!"
    assert json_data["chave"] == "fake-key"
