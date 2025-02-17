import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Para enviar dados para o backend
import "../styles/GenreSelection.css";
import { baseURL } from "../services/config";


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


      <button className="button-right" onClick={handleSubmit}>
        <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
          ></path>
        </svg>
        <span class="text">Prosseguir</span>
        <span class="circle"></span>
        <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
          ></path>
        </svg>
      </button>

      {showRefazer && (
        <div className="refazer-container">
          <button className="refazer-button" onClick={handleRefazerSelection}>
            <div className="error">
              <div className="error__close">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20">
                  <path fill="#393a37" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"></path>
                </svg>
              </div>
              <div className="message-error">
                <div className="error__icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none">
                    <path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path>
                  </svg>
                </div>
                <div className="error__title">Por favor, selecione ao menos um gênero para continuar.</div>
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default GenreSelection;
