import React from "react";
import './LastPage.css';

import LastPageImage from '../../assets/flork-pipoca.png'; 

const LastPage = () => {
  return (
    <div id="conteiner_last_page">
      <p className="last-page-text">Hora da pipoca</p>
        <img 
          id="flock-comendo-pipoca" 
          src={LastPageImage}   
          alt="Imagem final da fila" 
        />
    </div>
  );
};

export default LastPage;
