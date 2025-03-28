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


  const adjustFontSize = (title) => {
    const textLength = title.length;
    
    if (textLength <= 20) {
      return '1em';  
    } else if (textLength <= 40) {
      return '0.9em'; 
    } else if (textLength <= 60) {
      return '0.8em';   
    } 
    return '0.6em';  
  };
  
  useEffect(() => {
    const endpoint = filmesAssistidos ? "/mandar-filmes-assistido" : "/mandar-filmes-selecionado";
    axios.get(`${baseURL}${endpoint}`)
      .then((response) => {
        console.log("Dados recebidos da API:", response.data);
        const data = filmesAssistidos ? response.data.watched_movies : response.data.selected_movies;
        if (data) {
          const filmesFormatados = Object.keys(data).map((titulo) => ({
            title: titulo,
            title_br: data[titulo].title_pt,
            runtime: data[titulo].runtime,
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
                <>
                  <div key={index} className="movie-card">
                    <img src={movie.img} alt={movie.title} className="movie-image" />
                    <div className="movie-info-myfilms">
                      <p id="myfilms-movie-title" style={{ fontSize: adjustFontSize(movie.title_br) }}> {movie.title_br}</p>
                      <p>{movie.runtime > 0 ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min` : "N/A"}</p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Myfilms;
