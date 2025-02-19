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