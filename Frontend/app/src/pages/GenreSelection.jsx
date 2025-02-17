import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Para enviar dados para o backend
import "../styles/GenreSelection.css";
import { baseURL } from "../services/config";


const GenreSelection = () => {
  const navigate = useNavigate();

  const [genres, setGenres] = useState([
    { label: "Ação", value: "Action" },
    { label: "Aventura", value: "Adventure" },
    { label: "Comédia", value: "Comedy" },
    { label: "Drama", value: "Drama" },
    { label: "Ficção Científica", value: "Science Fiction" },
    { label: "Mistério", value: "Mistery" },
    { label: "Romance", value: "Romance" },
    { label: "Terror", value: "Horror" },
    { label: "Animação", value: "Animation" },
  ]);

  const [selectedGenres, setSelectedGenres] = useState([]); // Gêneros selecionados
  const [loading, setLoading] = useState(false); // Loading
  const [error, setError] = useState(null); // Erros
  const [showRefazer, setShowRefazer] = useState(false); // Controla a exibição do refazer seleção

  const newGenres = [
    { label: "Documentário", value: "Documentary" },
    { label: "Musical", value: "Music" },
    { label: "Histórico", value: "History" },
    { label: "Guerra", value: "War" },
    { label: "Suspense", value: "Thriller" },
    { label: "Crime", value: "Crime" },
    { label: "Faroeste", value: "Western" },
  ];

  const toggleGenre = (genreValue) => {
    setSelectedGenres((prevSelected) => {
      if (prevSelected.includes(genreValue)) {
        return prevSelected.filter((value) => value !== genreValue);
      } else if (prevSelected.length < 3) {
        return [...prevSelected, genreValue];
      }
      return prevSelected;
    });
  
    console.log("Gêneros selecionados:", selectedGenres);
  };
  
  const addGenres = () => {
    setGenres((prevGenres) => {
      const availableGenres = newGenres.filter(
        (newGenre) => !prevGenres.some((g) => g.value === newGenre.value)
      );
      
      const shuffledGenres = availableGenres.sort(() => 0.5 - Math.random());
      const selectedNewGenres = shuffledGenres.slice(0, 3);
      
      return [...prevGenres, ...selectedNewGenres];
    });
  };
  

  // Função para enviar os dados para o backend
  const handleSubmit = () => {
    if (selectedGenres.length <= 3 && selectedGenres.length > 0) {
      // Se tiver 1,2,3 gêneros selecionados, envia para o backend
      axios
        .post(`${baseURL}/selecionar_generos`, { selectedGenres })
        .then((response) => {
          console.log("Gêneros enviados com sucesso:", response.data);
          navigate("/escolha_tempo"); // Navega após o envio
        })
        .catch((error) => {
          console.error("Erro ao enviar os gêneros:", error);
          setError("Erro ao enviar os dados.");
        });
    } else {
      // Se nenhum gênero for selecionado, mostra a opção de refazer a seleção
      setShowRefazer(true);
    }
  };

  const handleRefazerSelection = () => {
    setShowRefazer(false); // Esconde a div de refazer seleção
    setSelectedGenres([]); // Limpa a seleção de gêneros
  };

  return (
  <div className="container_genre_selection">
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
              className={`genre-button ${
                selectedGenres.includes(genre.value) ? "selected" : ""
              }`}
              onClick={() => toggleGenre(genre.value)}
            >
              {genre.label}
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

    {showRefazer && (
      <div className="refazer-container">
        <p>Por favor, selecione ao menos um gênero para continuar.</p>
        <button className="refazer-button" onClick={handleRefazerSelection}>
          Refazer Seleção
        </button>
      </div>
    )}

    <button className="nav-button-right" onClick={handleSubmit}>
      →
    </button>
  </div>
  );
};

export default GenreSelection;
