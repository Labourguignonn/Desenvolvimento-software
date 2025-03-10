import React from "react";
import './LastPage.css';

import LastPageImage from '../../assets/Fundo_lastpage.png'; 
import PosterImage from '../../assets/poster.jpg'; 

const LastPage = () => {
  return (
    <div id="conteiner_last_page">
      <div className="background">
        <img src={LastPageImage} alt="Imagem de fundo da última página" className="last-page-image" />
      </div>

      <div className="container">
        <img src={PosterImage} className="poster" />
        
        <div className="texto">
          <h1 className="titulo">La La Land: Cantando Estações</h1>

          <div className="info-filme">
            <p className="nota">
              ⭐ <strong>9.1/10 IMDb</strong>
            </p>
            <span className="badge">Damien Chazelle</span>
            <span className="badge">2h 8m</span>
            </div>

          <h1 className="last-page-text">Cinematch te deseja um bom filme!</h1>
        </div>

      </div>

    </div>
  );
};

export default LastPage;