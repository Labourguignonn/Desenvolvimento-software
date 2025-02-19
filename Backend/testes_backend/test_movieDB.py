import sys
import os

# Adiciona a pasta `Backend` ao caminho do Python

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from BancoFilmes import collecting_data

from unittest.mock import patch, MagicMock

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
            "runtime": 100,
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
def test_collecting_data(mock_get):
    films = ["Test Movie"]
    max_runtime = 120
    selected_genres = ["Action"]
    
    result = collecting_data(films, max_runtime, selected_genres)
    
    assert "title_pt" in result and result["title_pt"] == ["Filme de Teste"]
    assert "title_en" in result and result["title_en"] == ["Test Movie"]
    assert "overview" in result and result["overview"] == ["Um filme de teste."]
    assert "runtime" in result and result["runtime"] == [100]
    assert "poster_path" in result and result["poster_path"] == ["/test_poster.jpg"]
    assert "review" in result and result["review"] == ["8.5"]
    assert "director" in result and result["director"] == ["Test Director"]
