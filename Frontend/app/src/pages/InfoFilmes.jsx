import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/InfoFilmes.css";

function InfoFilmes() {
  const navigate = useNavigate();
  
  // Recuperando o filme e as informações passadas na navegação
  const location = useLocation();
  const filme = location.state?.filme; // O filme foi passado através de `state`
  const filmeIndex = location.state?.index; // O índice do filme na lista
  const isLastFilm = location.state?.isLastFilm; // Verifica se é o último filme

  // Caso o filme não tenha sido passado corretamente, exibe um erro
  if (!filme) {
    return <div>Erro: Nenhum filme encontrado!</div>;
  }

  return (
    <>
      <div className="container-geral">
        <div className="container-info-filme">
          <div id="poster">
            {/* Exibindo a imagem do filme */}
            <img
              id="filme-selection"
              src={filme.imagem}
              alt={filme.titulo}
            />
          </div>

          <div id="infos-infofilmes">
            <h3 id="titulo">{filme.titulo}</h3>
            <p id="sinopse-texto">{filme.descricao}</p>
            <div id="detalhes">
              <div className="detalhe-item">
                <strong>Ano: </strong><span>{filme.ano}</span>
              </div>
              <div className="detalhe-item">
                <strong>Diretor: </strong><span>{filme.diretor}</span>
              </div>
              <div className="detalhe-item">
                <strong>Duração: </strong><span>{filme.duracao}</span>
              </div>
              <div className="detalhe-item">
                <strong>Onde Assistir: </strong><span>{filme.ondeAssistir}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container-pergunta">
          <div id="pergunta-infofilmes">
            <p>Ficou com vontade de assistir?</p>
            <div id="botoes">
              <button
                className="botao-infofilmes"
                onClick={() => navigate("/LastPage")}
              >
                Sim
              </button>
              <button
                className="botao-infofilmes"
                onClick={() => {
                  if (isLastFilm) {
                    navigate("/FinalDaFila");
                  } else {
                    navigate("/Selection", { state: { index: filmeIndex } });
                  }
                }}
              >
                Não
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoFilmes;
