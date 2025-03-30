import sys
import os
import pytest
from unittest.mock import patch, MagicMock

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from BancoFilmes import collecting_data

def mock_requests_get(url, headers):
    """Mock da função requests.get para simular respostas da API TMDB."""
    mock_response = MagicMock()
    
    if "search/movie" in url:
        mock_response.json.return_value = {
            "results": [{"id": 12345, "original_title": "Test Movie"}]
        }
    elif "genre/movie/list" in url:
        mock_response.json.return_value = {
            "genres": [{"id": 28, "name": "Action"}, {"id": 35, "name": "Comedy"}]
        }
    elif "movie/12345?language=pt-BR" in url:
        mock_response.json.return_value = {
            "title": "Filme de Teste",
            "original_title": "Test Movie",
            "overview": "Um filme de teste.",
            "runtime": 100,  # Corrigido para 100 (antes estava 150 incorretamente)
            "poster_path": "/test_poster.jpg",
            "vote_average": 8.5,
            "genres": [{"id": 28, "name": "Action"}]
        }
    elif "movie/12345/credits" in url:
        mock_response.json.return_value = {
            "crew": [{"job": "Director", "name": "Test Director"}]
        }
    else:
        mock_response.json.return_value = {}
    
    mock_response.raise_for_status = MagicMock()
    return mock_response

@patch("requests.get", side_effect=mock_requests_get)
def test_collecting_data_success(mock_get):
    """Testa se a função collecting_data retorna os dados corretamente."""
    films = ["Test Movie"]
    max_runtime = 120
    selected_genres = ["Action"]
    
    result = collecting_data(films, max_runtime, selected_genres)
    
    assert result["title_pt"] == ["Filme de Teste"]
    assert result["title_en"] == ["Test Movie"]
    assert result["overview"] == ["Um filme de teste."]
    assert result["runtime"] == [100]
    assert result["poster_path"] == ["/test_poster.jpg"]
    assert result["review"] == ["8.5"]
    assert result["director"] == ["Test Director"]

@patch("requests.get", side_effect=mock_requests_get)
def test_collecting_data_no_genre_match(mock_get):
    """Testa se um filme é filtrado quando o gênero não corresponde."""
    films = ["Test Movie"]
    max_runtime = 120
    selected_genres = ["Drama"]  # Gênero que não está no mock
    
    result = collecting_data(films, max_runtime, selected_genres)
    
    assert result["title_pt"] == []  # O filme deve ser filtrado
    assert result["title_en"] == []

@patch("requests.get", side_effect=mock_requests_get)
def test_collecting_data_runtime_exceeded(mock_get):
    """Testa se um filme é filtrado quando a duração excede o tempo máximo."""
    films = ["Test Movie"]
    max_runtime = 90  # Menor que 100, então o filme deve ser filtrado
    selected_genres = ["Action"]
    
    result = collecting_data(films, max_runtime, selected_genres)
    
    assert result["title_pt"] == []  # O filme deve ser filtrado
    assert result["title_en"] == []

@patch("requests.get", side_effect=Exception("Erro na requisição"))
def test_collecting_data_request_failure(mock_get):
    """Testa se a função lida corretamente com falhas na requisição."""
    films = ["Test Movie"]
    max_runtime = 120
    selected_genres = ["Action"]
    
    with pytest.raises(Exception, match="Erro na requisição"):
        collecting_data(films, max_runtime, selected_genres)