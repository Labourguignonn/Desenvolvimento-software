import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/InfoMovies.css";

function InfoMovies() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { filme, index: filmeIndex, dataDict } = state || {};

  if (!filme) return <div>Erro: Nenhum filme encontrado!</div>;

  const formatTime = (runtime) =>
    runtime > 0 ? `${Math.floor(runtime / 60)}h ${runtime % 60}min` : "N/A";

  return (
    <div className="container_info_movies">
      <div className="container-info-filme">
        <div id="poster">
          <img id="filme-selection" src={filme.poster_path} alt={filme.title_pt} />
        </div>
        <div id="infos-infofilmes">
          <h3 id="titulo">{filme.title_pt}</h3>
          <p id="sinopse-texto">{filme.overview}</p>
          <div id="detalhes">
            <div className="detalhe-item"><strong>Diretor: </strong>{filme.director}</div>
            <div className="detalhe-item"><strong>Duração: </strong>{formatTime(filme.runtime)}</div>
            <div className="detalhe-item"><strong>Nota: </strong>{filme.review}</div>
          </div>
        </div>
      </div>
      <div className="container-pergunta">
        <p id="pergunta">Ficou com vontade de assistir?</p>
        <div className="bottons-info-movies">
          <button className="botao-infofilmes" onClick={() => navigate("/ultima_pagina")}>Sim</button>
          <button className="botao-infofilmes" onClick={() => navigate("/seleção", { state: { index: filmeIndex, dataDict } })}>Não</button>
        </div>
      </div>
    </div>
  );
}

export default InfoMovies;
