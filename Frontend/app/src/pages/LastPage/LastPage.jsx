import React, { useState, useEffect } from "react";
import './LastPage.css';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../services/config";

import LastPageImage from '../../assets/Fundo_lastpage.png'; 

const LastPage = () => {
  const location = useLocation();
  const filme = location.state?.filme;
  const posterBaseURL = "https://image.tmdb.org/t/p/w500";
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = LastPageImage;
    img.onload = () => setImageLoaded(true);
  }, []);

  useEffect(() => {
    if (filme) {
      movieSelect(filme);
    }
  }, [filme]);

  const movieSelect = (filme) => {
    axios.post(`${baseURL}/adicionar-filme-selecionado`, {
      movie: filme
    })
    .then(response => {
      console.log("Filme selecionado enviado:", response.data.message);
    })
    .catch(error => {
      console.error("Erro ao enviar o filme selecionado:", error);
    });
  };

  const formatTime = (runtime) =>
    runtime > 0 ? `${Math.floor(runtime / 60)}h ${runtime % 60}min` : "N/A";

  return (
    <div id="conteiner_last_page">
      <div className="background-lastpage">
        {imageLoaded ? (
          <img src={LastPageImage} alt="Imagem de fundo" className="last-page-image" />
        ) : (
          <div className="loading-placeholder">Carregando...</div>
        )}
      </div>

      <div className="container-lastpage">
        <img src={posterBaseURL + filme.poster_path} className="poster-lastpage" alt={filme.title_pt} />
        
        <div className="texto-lastpage">
          <h1 className="titulo-lastpage">{filme.title_pt}</h1>

          <div className="info-filme-lastpage">
            <p className="nota-lastpage">
              ⭐ <strong>{parseFloat(filme.review).toFixed(1)}/10 IMDb</strong>
            </p>
            <span className="badge-lastpage">{filme.director}</span>
            <span className="badge-lastpage">{formatTime(filme.runtime)}</span>
          </div>

          <h1 className="last-page-text">Cinematch te deseja um bom filme!</h1>
        </div>
      </div>
    </div>
  );
};

export default LastPage;
