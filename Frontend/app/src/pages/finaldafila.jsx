import React from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/finaldafila.css'; 

// Importando a imagem corretamente
import FinalDaFilaImage from '../assets/final-da-fila.png'; // Caminho relativo para a imagem

const FinalDaFila = () => {
  const navigate = useNavigate(); 

  return (
    <div className="Conteiner-final-da-fila">
        <img 
          id="flock-triste" 
          src={FinalDaFilaImage}  // Usando a imagem importada diretamente
          alt="Imagem final da fila" 
        />
        
        <button
          className="botao-refazer-selecao"
          onClick={() => navigate("/")} 
        >
          Clique aqui para refazer a seleção
        </button>
    </div>
  );
}

export default FinalDaFila;
