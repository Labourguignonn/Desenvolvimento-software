import React from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/selection.css';

function Selection() {
  // Definindo o hook useNavigate
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div id="conteinerFilme">
        <img
          id="filmeSelection"
          src="https://br.web.img3.acsta.net/c_310_420/pictures/17/10/16/20/52/4165591.jpg"
          alt="Filme Pele"
        />
        <h3>Pele</h3>
        <div id="pergunta">
          <div>
            <p>Você já assistiu a esse filme?</p>
          </div>
          <div>
            <button className="botao-selecao">Sim</button>
            <button
              className="botao-selecao"
              onClick={() => navigate("/InfoFilmes")} // Ação de navegação ao clicar
            >
              Não
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Selection;
