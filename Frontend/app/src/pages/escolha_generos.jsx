import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

import "../styles/escolha_generos.css";

const GenreSelection = () => {
  const navigate = useNavigate();

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

  const [selectedGenres, setSelectedGenres] = useState([]);

  const newGenres = ["Documentário", "Musical", "Histórico"];

  const toggleGenre = (genre) =>{
    setSelectedGenres((prevSelected) =>
    prevSelected.includes(genre)
      ? prevSelected.filter((item) => item !== genre)
      : [...prevSelected, genre]
    );
  };
  
  const addGenres = () => {
    setGenres((prevGenres) => [...prevGenres, ...newGenres]);
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
          {genres.map((genre, index) => (
            <button 
            key={index} 
            className={`genre-button ${
              selectedGenres.includes(genre) ? "selected" : ""
            }`}
            onClick={() => toggleGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
        <div className="add_button-container">
            <button className="add-button" onClick={addGenres}>+</button>
        </div>
        <button 
        className="next-button" 
        onClick={() => navigate("/escolha_tempo")}
        >→</button>
      </div>
      <button className="nav-button-right" onClick={() => navigate('/escolha_tempo')}>→</button>
    </div> 
  );
};

export default GenreSelection;