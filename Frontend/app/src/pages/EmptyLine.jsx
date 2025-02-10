import React from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/EmptyLine.css'; 

import FinalDaFilaImage from '../assets/final-da-fila.png'; 

const EmptyLine = () => {
  const navigate = useNavigate(); 

  return (
    <div className="Conteiner-final-da-fila">
        <img 
          id="flock-triste" 
          src={FinalDaFilaImage}  
          alt="Imagem final da fila" 
        />
        
        <button
          className="botao-refazer-selecao"
          onClick={() => navigate("/escolha_generos")} 
        >
          Clique aqui para refazer a seleção
        </button>
    </div>
  );
}

export default EmptyLine;
