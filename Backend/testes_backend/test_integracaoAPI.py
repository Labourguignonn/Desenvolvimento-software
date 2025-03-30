import pytest
import sys
import os
from unittest.mock import patch
from openai import OpenAIError

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Importando as funções do módulo correto
from IntegracaoAPI import call_openai, call_openai_extra

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
    """Testa a função call_openai garantindo que ela retorna um conjunto correto de filmes."""
    key = "fake-key"
    genre = "action, thriller"
    runtime = 120
    rating = "PG-13"
    watched_movies = {"Movie X"}
    selected_movies = {"Movie Y"}

    result = call_openai(key, genre, runtime, rating, watched_movies, selected_movies)

    assert isinstance(result, set)
    assert len(result) <= 5  # Pode ser menor devido à filtragem
    assert "Movie 1" in result
    assert "Movie 2" in result
    assert "Movie 3" in result
    assert "Movie 4" in result
    assert "Movie 5" in result
    assert "Anora" not in result  # Certificando de que os filmes excluídos não aparecem
    assert "Emilia Pérez" not in result

    openai_mock.assert_called_once()

def test_call_openai_extra(openai_mock):
    """Testa a função call_openai_extra garantindo que novos filmes são adicionados sem repetir os existentes."""
    key = "fake-key"
    genre = "comedy, romance"
    runtime = 90
    rating = "R"
    existing_movies = {"Movie 1", "Movie 2"}
    watched_movies = {"Movie 3"}
    selected_movies = {"Movie 4"}

    result = call_openai_extra(key, genre, runtime, rating, existing_movies, watched_movies, selected_movies)

    assert isinstance(result, set)
    assert len(result) <= 5  # Pode ser menor devido à filtragem
    assert "Movie 1" in result  # Filmes existentes devem permanecer
    assert "Movie 2" in result
    assert "Movie 3" not in result  # Filmes assistidos devem ser removidos
    assert "Movie 4" not in result  # Filmes selecionados devem ser removidos
    assert "Anora" not in result
    assert "Emilia Pérez" not in result

    openai_mock.assert_called_once()

def test_call_openai_error():
    """Testa se a função call_openai lida corretamente com erros da API."""
    key = "fake-key"
    genre = "drama"
    runtime = 100
    rating = "PG-13"
    watched_movies = set()
    selected_movies = set()

    with patch("openai.ChatCompletion.create", side_effect=OpenAIError("Erro na API")):
        with pytest.raises(OpenAIError):
            call_openai(key, genre, runtime, rating, watched_movies, selected_movies)
