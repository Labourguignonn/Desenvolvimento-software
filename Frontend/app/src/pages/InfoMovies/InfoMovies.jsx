import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./InfoMovies.css";

function InfoMovies() {
  const navigate = useNavigate();
  

  // Recuperando o filme, o índice e o dicionário de filmes passados na navegação
  const location = useLocation();
  const filme = location.state?.filme; // O filme foi passado através de `state`
  const filmeIndex = location.state?.index; // O índice do filme na lista
  const dataDict = location.state?.dataDict; // O dicionário de filmes completo

  console.log("Filme recebido:", filme);


  // Caso o filme não tenha sido passado corretamente, exibe um erro
  if (!filme) {
    return <div>Erro: Nenhum filme encontrado!</div>;
  }

  // Você pode usar `dataDict` aqui para acessar outros filmes, se necessário
  console.log("Dicionário de filmes:", dataDict);

  const formatTime = (runtime) => {
    if (!runtime || runtime <= 0) return "N/A"; // Caso o valor seja inválido
  
    const horas = Math.floor(runtime / 60); // Obtém as horas
    const minutos = runtime % 60; // Obtém os minutos restantes
  
    return minutos > 0 ? `${horas}h ${minutos}min` : `${horas}h`; 
  };

  return (
    <>
      <div className="container_info_movies">
        <div className="container-info-filme">
          <div id="poster">
            {/* Exibindo a imagem do filme */}
            <img
              id="filme-selection"
              src={filme.poster_path}  // Aqui agora você deve usar o `poster_path` completo
              alt={filme.title_pt}
            />
          </div>

          <div id="infos-infofilmes">
            <h3 id="titulo">{filme.title_pt}</h3>
            <p id="sinopse-texto">{filme.overview}</p>
            <div id="detalhes">
              <div className="detalhe-item">
                <strong>Diretor: </strong><span>{filme.director}</span>
              </div>
              <div className="detalhe-item">
                <strong>Duração: </strong><span>{formatTime(filme.runtime)}</span>
              </div>
              <div className="detalhe-item">
                <strong>Nota: </strong><span>{filme.review}</span>
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
                onClick={() => navigate("/ultima_pagina")}
              >
                Sim
              </button>
              <button
                className="botao-infofilmes"
                onClick={() => navigate("/seleção", { state: { index: filmeIndex, dataDict: dataDict } })}
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

export default InfoMovies;
