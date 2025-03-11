import React from "react";
import './LastPage.css';
import { useLocation } from "react-router-dom";

import LastPageImage from '../../assets/Fundo_lastpage.png'; 

const LastPage = () => {
  const location = useLocation();
  const filme = location.state?.filme;
  const posterBaseURL = "https://image.tmdb.org/t/p/w500";

  const formatTime = (runtime) =>
    runtime > 0 ? `${Math.floor(runtime / 60)}h ${runtime % 60}min` : "N/A";

  return (
    <div id="conteiner_last_page">
      <div className="background-lastpage">
        <img src={LastPageImage} alt="Imagem de fundo da última página" className="last-page-image" />
      </div>

      <div className="container-lastpage">
        <img src={posterBaseURL + filme.poster_path} className="poster-lastpage" />
        
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