import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axios"; // Importando o axios
import logo from "../assets/logo.png";
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

  // useEffect(() => {
  //   const fetchGenres = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get("/filtro_genero");
  //       setGenres(response.data?.genres || []); // Fallback seguro
  //     } catch (error) {
  //       console.error("Erro ao carregar gêneros:", error);
  //       setError("Erro ao carregar os gêneros");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchGenres();
  // }, []);

  // const handleSubmit = () => {
  //   axios
  //     .post("/filtro_genero", { selectedGenres })
  //     .then((response) => {
  //       console.log("Gêneros enviados com sucesso", response.data);
  //       navigate("/escolha_tempo");
  //     })
  //     .catch((error) => {
  //       console.error("Erro ao enviar gêneros", error);
  //     });
  // };

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
