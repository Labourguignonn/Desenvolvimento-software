import React from "react";
import { useNavigate } from 'react-router-dom';
import './EmptyLine.css'; 

import FinalDaFilaImage from '../../assets/final-da-fila.png'; 

const EmptyLine = () => {
  const navigate = useNavigate(); 

  return (
    <div className="conteiner_empty_line">
      
        <img 
          id="flock-triste" 
          src={FinalDaFilaImage}  
          alt="Imagem final da fila" 
        />
        
        <button
          className="botao-refazer-selecao"
          onClick={() => navigate("/filtros")} 
        >
          Clique aqui para refazer a seleção
        </button>
    </div>
  );
}

export default EmptyLine;
