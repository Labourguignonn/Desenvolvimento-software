import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/escolha_generos.css";

const GenreSelection = () => {
  const navigate = useNavigate();

  // Estados iniciais corrigidos
  const [genres, setGenres] = useState([
    "Ação",
    "Aventura",
    "Comédia",
    "Drama",
    "Fantasia",
    "Ficção Científica",
    "Mistério",
    "Romance",
    "Terror",
    "Animação"
  ]);

  const [selectedGenres, setSelectedGenres] = useState([]); // Inicialize como array vazio
  const [loading, setLoading] = useState(false); // Não há loading agora
  const [error, setError] = useState(null); // Não há erros no frontend

  const newGenres = ["Documentário", "Musical", "Histórico"];

  const toggleGenre = (genre) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genre)
        ? prevSelected.filter((item) => item !== genre)
        : [...prevSelected, genre]
    );
  };

  const addGenres = () => {
    setGenres((prevGenres) => {
      const updatedGenres = [...prevGenres];
      newGenres.forEach((genre) => {
        if (!updatedGenres.includes(genre)) {
          updatedGenres.push(genre);
        }
      });
      return updatedGenres;
    });
  };

  // Substituí a handleSubmit para evitar erro
  const handleSubmit = () => {
    console.log("Gêneros selecionados:", selectedGenres);
    navigate("/escolha_tempo"); // Apenas navega
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
            <div>Carregando gêneros...</div>
          ) : error ? (
            <div>{error}</div>
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
          <button className="add-button" onClick={addGenres}>
            +
          </button>
        </div>
      </div>

      <button className="nav-button-right" onClick={handleSubmit}>
        →
      </button>
    </div>
  );
};

export default GenreSelection;