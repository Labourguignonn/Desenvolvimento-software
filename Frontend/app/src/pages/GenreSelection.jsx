import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Para enviar dados para o backend
import "../styles/GenreSelection.css";
import { baseURL } from "../services/config";
import NextButton from "../components/NextButton";
import ErrorMessage from "../components/ErrorMessage";


const GenreSelection = () => {
  const navigate = useNavigate();
  
  const [selectedGenres, setSelectedGenres] = useState([]); // Gêneros selecionados
  const [loading, setLoading] = useState(false); // Loading
  const [error, setError] = useState(null); // Erros
  const [showRefazer, setShowRefazer] = useState(false); // Controla a exibição do refazer seleção

  const [genres, setGenres] = useState([
    { label: "Ação", value: "Action" },
    { label: "Aventura", value: "Adventure" },
    { label: "Comédia", value: "Comedy" },
    { label: "Drama", value: "Drama" },
    { label: "Ficção Científica", value: "Science Fiction" },
    { label: "Mistério", value: "Mystery" },
    { label: "Romance", value: "Romance" },
    { label: "Terror", value: "Horror" },
    { label: "Animação", value: "Animation" },
  ]);

  const newGenres = [
    { label: "Documentário", value: "Documentary" },
    { label: "Musical", value: "Music" },
    { label: "Histórico", value: "History" },
    { label: "Guerra", value: "War" },
    { label: "Suspense", value: "Thriller" },
    { label: "Crime", value: "Crime" },
    { label: "Faroeste", value: "Western" },
    { label: "Fantasia", value: "Fantasy" },
  ];

  const toggleGenre = (genreValue) => {
    setSelectedGenres((prevSelected) => {
      const updatedSelection = prevSelected.includes(genreValue)
        ? prevSelected.filter((value) => value !== genreValue)
        : prevSelected.length < 3
        ? [...prevSelected, genreValue]
        : prevSelected;
  
      console.log("Gêneros selecionados:", updatedSelection);
      return updatedSelection;
    });
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
    setTimeout(() => {
      if (genresContainerRef.current) {
        genresContainerRef.current.scrollTop = genresContainerRef.current.scrollHeight;
      }
    }, 100);
  };
  
  // Função para enviar os dados para o backend
  const handleSubmit = () => {
    if (selectedGenres.length <= 3 && selectedGenres.length > 0) {
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
        <h2 className="subtitle_genres">Selecione até 3 gêneros</h2>
        <div className="genres-container">
          {loading ? (
            <div>Carregando gêneros...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            genres.map((genre, index) => (
              <button
                key={index}
                className={`genre-button ${selectedGenres.includes(genre.value) ? "selected" : ""
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

      <NextButton proceedLink="/escolha_tempo" onProceedClick={handleSubmit} />

      {showRefazer && (
        <>
          <ErrorMessage
            message="Por favor, selecione até 3 gêneros para continuar."
            onClose={handleRefazerSelection}
          />
        </>
      )}
    </div>
  );
};

export default GenreSelection;
