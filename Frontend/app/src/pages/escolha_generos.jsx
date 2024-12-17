import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../utils/axios'; // Importando o axios
import logo from "../assets/logo.png";
import "../styles/escolha_generos.css";

const GenreSelection = () => {
  const navigate = useNavigate();

  const [genres, setGenres] = useState([]);  // Mudando para buscar gêneros da API
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(false);  // Para exibir um indicador de carregamento
  const [error, setError] = useState(null);  // Para capturar e exibir erros

  const newGenres = ["Documentário", "Musical", "Histórico"];

  // Toggle para selecionar/deselecionar gêneros
  const toggleGenre = (genre) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genre)
        ? prevSelected.filter((item) => item !== genre)
        : [...prevSelected, genre]
    );
  };

  // Função para adicionar gêneros à lista
  const addGenres = () => {
    setGenres((prevGenres) => [...prevGenres, ...newGenres]);
  };

  // Função para buscar gêneros da API (ou backend)
  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        // Requisição para o endpoint da API FastAPI
        const response = await axios.get('/filtro_genero');
        setGenres(response.data.genres || []);  // Atualizando a lista de gêneros com a resposta da API
      } catch (error) {
        setError("Erro ao carregar os gêneros");
      } finally {
        setLoading(false);
      }
    };

    fetchGenres(); // Chamada da função para buscar os gêneros
  }, []);

  const handleSubmit = () => {
    // Enviar os gêneros selecionados para o backend (se necessário)
    axios.post('/filtro_genero', { selectedGenres })
      .then((response) => {
        console.log('Gêneros enviados com sucesso', response.data);
        navigate('/escolha_tempo'); // Redirecionar após enviar
      })
      .catch((error) => {
        console.error('Erro ao enviar gêneros', error);
      });
  };

  return (
    <div className="main_container">
      <div className="left-section_genres">
        <h1 className="title_genres">
          Escolha <br /> dos <br /> Gêneros
        </h1>
      </div>

      <div className="right-section-genres">
        <div className="genres-container">
          {loading ? (
            <div>Carregando gêneros...</div>  {/* Indicador de carregamento */}
          ) : error ? (
            <div>{error}</div>  {/* Exibindo erro se ocorrer */}
          ) : (
            genres.map((genre, index) => (
              <button
                key={index}
                className={`genre-button ${selectedGenres.includes(genre) ? "selected" : ""}`}
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </button>
            ))
          )}
        </div>

        <div className="add_button-container">
          <button className="add-button" onClick={addGenres}>+</button>
        </div>
      </div>

      {/* Botão de navegação para a próxima página */}
      <button className="nav-button-right" onClick={handleSubmit}>→</button>
    </div>
  );
};

export default GenreSelection;
