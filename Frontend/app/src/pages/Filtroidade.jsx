import React from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/stylefiltroidade.css';

function Filtroidade() {
  const navigate = useNavigate();  // Hook para navegação

  return (
    <div className="central">
      <div className="lado_esquerdo">
        <h1 className="titulo"> Restrição <br /> de <br /> Idade</h1>
      </div>
      <div className="lado_direito">
        <div className="row">
          <button className="button-option-livre">L</button>
          <button className="button-option">Livre para todos os públicos</button>
        </div>
        <div className="row">
          <button className="button-option-10">10</button>
          <button className="button-option">Não recomendado p/ menores de 10 anos</button>
        </div>
        <div className="row">
          <button className="button-option-12">12</button>
          <button className="button-option">Não recomendado p/ menores de 12 anos</button>
        </div>
        <div className="row">
          <button className="button-option-14">14</button>
          <button className="button-option">Não recomendado p/ menores de 14 anos</button>
        </div>
        <div className="row">
          <button className="button-option-16">16</button>
          <button className="button-option">Não recomendado p/ menores de 16 anos</button>
        </div>
        <div className="row">
          <button className="button-option-18">18</button>
          <button className="button-option">Não recomendado p/ menores de 18 anos</button>
        </div>
      </div>

      {/* Botão de navegação */}
      <button
        className="arrow-button"
        onClick={() => navigate("/Selection")}  // Função de navegação
      >
        →
      </button>
    </div>
  );
}

export default Filtroidade;
