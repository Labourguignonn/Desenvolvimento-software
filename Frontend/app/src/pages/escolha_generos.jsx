import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Para enviar dados para o backend
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

  const [selectedGenres, setSelectedGenres] = useState([]); // Gêneros selecionados
  const [loading, setLoading] = useState(false); // Loading
  const [error, setError] = useState(null); // Erros

  const newGenres = ["Documentário", "Musical", "Histórico"];

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      // Se o gênero já estiver selecionado, remove ele
      setSelectedGenres((prevSelected) =>
        prevSelected.filter((item) => item !== genre)
      );
    } else if (selectedGenres.length < 3) {
      // Se não tiver 3 gêneros selecionados, adiciona o gênero
      setSelectedGenres((prevSelected) => [...prevSelected, genre]);
    }
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

  // Função para enviar os dados para o backend
  const handleSubmit = () => {
    if (selectedGenres.length === 3) {
      // Se tiver 3 gêneros selecionados, envia para o backend
      axios
        .post("http://localhost:5000/api/selecionar_generos", { selectedGenres })
        .then((response) => {
          console.log("Gêneros enviados com sucesso:", response.data);
          navigate("/escolha_tempo"); // Navega após o envio
        })
        .catch((error) => {
          console.error("Erro ao enviar os gêneros:", error);
          setError("Erro ao enviar os dados.");
        });
    } else {
      setError("Por favor, selecione 3 gêneros.");
    }
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
                className={`genre-button ${
                  selectedGenres.includes(genre) ? "selected" : ""
                }`}
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
