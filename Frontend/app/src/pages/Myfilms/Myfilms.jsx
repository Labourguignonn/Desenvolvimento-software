import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Myfilms.css";
import { baseURL } from "../../services/config";
import imagemFundo from "../../assets/fundo_meusfilmes.webp";

const posterBaseURL = "https://image.tmdb.org/t/p/w500";

const Myfilms = () => {
  const [loaded, setLoaded] = useState(false);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filmesAssistidos, setFilmesAssistidos] = useState(true);



  useEffect(() => {
    const endpoint = filmesAssistidos ? "/mandar-filmes-assistido" : "/mandar-filmes-selecionado";
    axios.get(`${baseURL}${endpoint}`)
      .then((response) => {
        console.log("Dados recebidos da API:", response.data);
        const data = filmesAssistidos ? response.data.watched_movies : response.data.selected_movies;
        if (data) {
          const filmesFormatados = Object.keys(data).map((titulo) => ({
            title: titulo,
            img: data[titulo].poster_path ? `${posterBaseURL}${data[titulo].poster_path}` : "URL_DA_IMAGEM_PADRÃO"
          }));
          setMovies(filmesFormatados);
        }
      })
      .catch((error) => console.error("Erro ao buscar filmes:", error))
      .finally(() => setLoading(false));
  }, [filmesAssistidos]);

  useEffect(() => {
    const img = new Image();
    img.src = imagemFundo;
    img.onload = () => setLoaded(true);
  }, []);

  return (
    <div id="container_myfilms">
      <div className="background_myfilms">
        <img
          src={imagemFundo}
          className={`myfilms-image ${loaded ? "loaded" : "loading"}`}
          alt="Fundo Meus Filmes"
        />
      </div>

      <div className="content-myfilms">
        <div className="SectionTitle">
          <div className="SectionTitle-left">
            <h1 className="title-myfilms">
              {filmesAssistidos ? "Meus filmes assistidos" : "Meus filmes selecionados"}
            </h1>
          </div>
          <div className="SectionTitle-right">
            <button className="SelectSet" onClick={() => setFilmesAssistidos(!filmesAssistidos)}>
              {filmesAssistidos ? "Filmes Selecionados" : "Filmes Assistidos"}
            </button>
          </div>
        </div>
        <div className="myfilms">
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div className="movie-grid">
              {movies.map((movie, index) => (
                <div key={index} className="movie-card">
                  <img src={movie.img} alt={movie.title} className="movie-image" />
                  <p>{movie.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myfilms;
