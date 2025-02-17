import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importe o Axios para enviar os dados
import "../styles/RatingSelection.css";
import { baseURL } from "../services/config";


function RatingSelection() {
  const navigate = useNavigate(); // Hook para navegação
  const [selectedRating, setBotaoSelecionado] = useState(null); // Estado para armazenar o botão clicado

  // Função chamada ao clicar em qualquer botão de restrição
  const handleClick = (botao) => {
    setBotaoSelecionado(botao); // Salva o botão clicado no estado
  };

  // Função para enviar os dados para o backend
  const enviarDadosParaBackend = (botaoClicado) => {
    axios
      .post(`${baseURL}/selecionar_classificacao`, {
        botaoClicado,
      })
      .then((response) => {
        console.log("Dados enviados com sucesso:", response.data);
        navigate("/carregamento");
      })
      .catch((error) => {
        console.error("Erro ao enviar dados:", error);
      });
  };

  return (
    <div className="container_rating_selection">
      <div className="lado_esquerdo">
        <h1 className="titulo"> Restrição <br /> de <br /> Idade</h1>
      </div>
      <div className="lado_direito">
        <div className="row">
          <button
            className="button-option-livre"
            onClick={() => handleClick("G")}>L</button>
          <button className="button-option">Livre para todos os públicos</button>
        </div>
        <div className="row">
          <button
            className="button-option-10"
            onClick={() => handleClick("G")}>10</button>
          <button className="button-option">
            Não recomendado p/ menores de 10 anos
          </button>
        </div>
        <div className="row">
          <button
            className="button-option-12"
            onClick={() => handleClick("PG")}>12</button>
          <button className="button-option">
            Não recomendado p/ menores de 12 anos
          </button>
        </div>
        <div className="row">
          <button
            className="button-option-14"
            onClick={() => handleClick("PG-13")}>14</button>
          <button className="button-option">
            Não recomendado p/ menores de 14 anos
          </button>
        </div>
        <div className="row">
          <button
            className="button-option-16"
            onClick={() => handleClick("R")}>16</button>
          <button className="button-option">
            Não recomendado p/ menores de 16 anos
          </button>
        </div>
        <div className="row">
          <button
            className="button-option-18"
            onClick={() => handleClick("R")}>18</button>
          <button className="button-option">
            Não recomendado p/ menores de 18 anos
          </button>
        </div>
      </div>

      {/* Botão de navegação */}
      <button
        className="nav-button-left"
        onClick={() => navigate("/escolha_tempo")}
      >
        ←
      </button>
      <button 
        className="nav-button-right" 
        onClick={() => enviarDadosParaBackend(selectedRating)}>
        →
      </button>
    </div>
  );
}

export default RatingSelection;