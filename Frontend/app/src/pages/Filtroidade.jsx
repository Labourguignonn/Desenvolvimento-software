import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importe o Axios para enviar os dados
import "../styles/stylefiltroidade.css";

function Filtroidade() {
  const navigate = useNavigate(); // Hook para navegação
  const [botaoSelecionado, setBotaoSelecionado] = useState(null); // Estado para armazenar o botão clicado

  // Função chamada ao clicar em qualquer botão de restrição
  const handleClick = (botao) => {
    setBotaoSelecionado(botao); // Salva o botão clicado no estado
  };

  // Função chamada ao clicar no botão de navegação →
  const handleNavButtonClick = () => {
    if (botaoSelecionado) {
      enviarDadosParaBackend(botaoSelecionado); // Envia dados apenas se um botão foi selecionado
      navigate("/carregamento"); // Navega para a página desejada
    }
  };

  // Função para enviar os dados para o backend
  const enviarDadosParaBackend = (botaoClicado) => {
    axios
      .post("http://localhost:5000/api/clicks", {
        botaoClicado,
      })
      .then((response) => {
        console.log("Dados enviados com sucesso:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao enviar dados:", error);
      });
  };

  return (
    <div className="central">
      <div className="lado_esquerdo">
        <h1 className="titulo"> Restrição <br /> de <br /> Idade</h1>
      </div>
      <div className="lado_direito">
        <div className="row">
          <button
            className="button-option-livre"
            onClick={() => handleClick("L")}>L</button>
          <button className="button-option">Livre para todos os públicos</button>
        </div>
        <div className="row">
          <button
            className="button-option-10"
            onClick={() => handleClick("10")}>10</button>
          <button className="button-option">
            Não recomendado p/ menores de 10 anos
          </button>
        </div>
        <div className="row">
          <button
            className="button-option-12"
            onClick={() => handleClick("12")}>12</button>
          <button className="button-option">
            Não recomendado p/ menores de 12 anos
          </button>
        </div>
        <div className="row">
          <button
            className="button-option-14"
            onClick={() => handleClick("14")}>14</button>
          <button className="button-option">
            Não recomendado p/ menores de 14 anos
          </button>
        </div>
        <div className="row">
          <button
            className="button-option-16"
            onClick={() => handleClick("16")}>16</button>
          <button className="button-option">
            Não recomendado p/ menores de 16 anos
          </button>
        </div>
        <div className="row">
          <button
            className="button-option-18"
            onClick={() => handleClick("18")}>18</button>
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
      <button className="nav-button-right" onClick={handleNavButtonClick}>
        →
      </button>
    </div>
  );
}

export default Filtroidade;
