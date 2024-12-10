import React from "react";
import './Selection.css';

function Selection() {
  return (
    <div className="home-container">
      <div id="conteinerFilme">
        <img
          id="filmeSelection"
          src="https://br.web.img3.acsta.net/c_310_420/pictures/17/10/16/20/52/4165591.jpg"
        />
        <h3>Pele</h3>
        <div id="pergunta">
          <div>
            <p >Você já assistiu a esse filme?</p>
          </div>
          <div>
            <button className="botao-selecao">Sim</button>
            <button className="botao-selecao">Não</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Selection;
