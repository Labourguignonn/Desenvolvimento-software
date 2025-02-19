import pytest
import sys
import os
from unittest.mock import patch
from openai import OpenAIError

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

#importando as funções de IntegraçãoAPI.py
from IntegracaoAPI import call_openai, call_openai_extra  # Importe corretamente

# Mock da resposta da API
mock_response = {
    "choices": [{
        "message": {"content": "Movie 1;Movie 2;Movie 3;Movie 4;Movie 5"}
    }]
}

@pytest.fixture
def openai_mock():
    """Mock da API do OpenAI para evitar chamadas reais."""
    with patch("openai.ChatCompletion.create") as mock:
        mock.return_value = mock_response
        yield mock

def test_call_openai(openai_mock):
    """Testa a função call_openai garantindo que ela retorna uma lista correta."""
    key = "fake-key"
    genre = "action, thriller"
    runtime = 120
    rating = "PG-13"

    result = call_openai(key, genre, runtime, rating)

    assert isinstance(result, list)
    assert len(result) == 5
    assert result == ["Movie 1", "Movie 2", "Movie 3", "Movie 4", "Movie 5"]

    # Verifica se a API foi chamada corretamente
    openai_mock.assert_called_once()

def test_call_openai_extra(openai_mock):
    """Testa a função call_openai_extra garantindo que ela retorna novos filmes sem repetir os existentes."""
    key = "fake-key"
    genre = "comedy, romance"
    runtime = 90
    rating = "R"
    existing_movies = ["Movie 1", "Movie 2"]

    result = call_openai_extra(key, genre, runtime, rating, existing_movies)

    assert isinstance(result, list)
    assert len(result) == 5  
    assert "Movie 1" in result
    assert "Movie 2" in result

    # Verifica se a API foi chamada corretamente
    openai_mock.assert_called_once()

def test_call_openai_error():
    """Testa se a função call_openai lida corretamente com erros da API."""
    key = "fake-key"
    genre = "drama"
    runtime = 100
    rating = "PG-13"

    with patch("openai.ChatCompletion.create", side_effect=OpenAIError("Erro na API")):
        with pytest.raises(OpenAIError):
            call_openai(key, genre, runtime, rating)
