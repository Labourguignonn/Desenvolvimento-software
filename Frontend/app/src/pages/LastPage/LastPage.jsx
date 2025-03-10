import React from "react";
import './LastPage.css';

import LastPageImage from '../../assets/Fundo_lastpage.png'; 
import PosterImage from '../../assets/poster.jpg'; 

const LastPage = () => {
  return (
    <div id="conteiner_last_page">
      <div className="background-lastpage">
        <img src={LastPageImage} alt="Imagem de fundo da última página" className="last-page-image" />
      </div>

      <div className="container-lastpage">
        <img src={PosterImage} className="poster-lastpage" />
        
        <div className="texto-lastpage">
          <h1 className="titulo-lastpage">La La Land: Cantando Estações</h1>

          <div className="info-filme-lastpage">
            <p className="nota-lastpage">
              ⭐ <strong>9.1/10 IMDb</strong>
            </p>
            <span className="badge-lastpage">Damien Chazelle</span>
            <span className="badge-lastpage">2h 8m</span>
            </div>

          <h1 className="last-page-text">Cinematch te deseja um bom filme!</h1>
        </div>

      </div>

    </div>
  );
};

export default LastPage;