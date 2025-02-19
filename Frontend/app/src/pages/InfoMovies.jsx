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
.container_info_movies {
  display: flex;
  flex-direction: column;
  justify-content: center; /* Centraliza o conteúdo internamente */
  align-items: center;
  font-family: Arial, sans-serif;
  height: 100%;
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
  box-sizing: border-box;
  margin: 0 auto; 
  padding-top: 10vh;
}

/* Estilos para o contêiner das informações do filme */
.container-info-filme {
  background-color: #161616;
  height: 60vh;
  width: 80%;
  display: flex;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  align-items: center; /* Centraliza verticalmente */
}

/* Estilos para a imagem do filme */
#poster {
  flex: 1;
  height: 100%; /* Garante que a largura se ajuste */
  object-fit: contain; /* Garante que a imagem não fique distorcida */
}

#filme-selection {
  width: auto;
  height: 100%;
  border-radius: 10px;
}

/* Estilos para a parte de informações do filme */
#infos-infofilmes {
  flex: 2;
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 3%;
}

/* Estilos para o título do filme */
#titulo {
  font-size: 1.5em;
  font-weight: bold;
  color: white;
  margin-left: 0px; /* Removido espaço à esquerda */
  text-align: center; /* Centraliza o título */
}

/* Estilos para a sinopse */
#sinopse-texto {
  font-size: 14px;
  text-align: justify;
  line-height: 1.6;
  color: white;
  margin-bottom: 15px;
  max-height: 220px;
  overflow-y: auto;
  padding-right: 15px;
}

/* Estilos para os detalhes do filme */
#detalhes {
  font-size: 12px;
  color: rgb(167, 169, 209);
}

.detalhe-item {
  margin-bottom: 8px;
}

.detalhe-item strong {
  font-weight: bold;
}

/* Estilos para o contêiner de pergunta */
.container-pergunta {
  display: flex;
  flex-direction: column;
  justify-content: column;
  align-items: center;
  padding: 15px;
  gap: 10px;
}

#pergunta {
  font-size: 1.2em;
  color: white;
  text-align: center;
  gap: 10px;
}

.botao-infofilmes {
  gap: 30px; /* Reduzido de 10px para 8px */
  padding: 10px 20px; /* Reduzi o padding */
  background-color: #1B1F3A;
  color: white;
  border-radius: 6px; /* Bordas menores */
  font-size: 0.9em; /* Fonte ligeiramente menor */
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100px; /* Largura menor */
  border: 2px solid #3D348B; /* Bordas mais finas */
}

.bottons-info-movies{
  gap: 10px;
}

.botao-infofilmes:hover {
  background-color: #3D348B;
}

.botao-infofilmes:focus {
  outline: none;
  color: black; /* Cor da fonte quando o botão está em foco */
}

/* Efeitos visuais ao passar o mouse */
.botao-infofilmes:active {
  transform: scale(0.95); /* Redução ligeiramente maior ao clicar */
}
