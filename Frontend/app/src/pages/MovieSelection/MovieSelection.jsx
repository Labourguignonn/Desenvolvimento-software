import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MovieSelection.css";
import { baseURL } from "../../services/config";

function MovieSelection() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dataDict, setDataDict] = useState(null);
  const [selectedFilmIndex, setSelectedFilmIndex] = useState(0); // Índice do filme em destaque
  const [showRefazerText, setShowRefazerText] = useState(false);
  const posterBaseURL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    axios.get(`${baseURL}/entregar-filmes`)
      .then((response) => {
        const data = response.data.data_dict;
        if (data?.title_pt) {
          setDataDict(data);
        } else {
          console.error("Estrutura de dados inválida:", data);
        }
      })
      .catch((error) => console.error("Erro ao buscar filmes:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Carregando filmes...</p>;
  if (!dataDict || !dataDict.title_pt.length) navigate("/final_da_fila");

  // Dados do filme em destaque
  const filmeAtual = {
    title_en: dataDict.title_en?.[selectedFilmIndex],
    title_pt: dataDict.title_pt[selectedFilmIndex],
    overview: dataDict.overview?.[selectedFilmIndex] || "Sinopse não disponível.",
    director: dataDict.director?.[selectedFilmIndex] || "Desconhecido",
    runtime: dataDict.runtime?.[selectedFilmIndex] || 0,
    review: dataDict.review?.[selectedFilmIndex] || "Sem nota",
    poster_path: dataDict.poster_path?.[selectedFilmIndex]
      ? posterBaseURL + dataDict.poster_path[selectedFilmIndex]
      : "URL da imagem padrão"
  };

  // Função para formatar a duração do filme
  const formatTime = (runtime) =>
    runtime > 0 ? `${Math.floor(runtime / 60)}h ${runtime % 60}min` : "N/A";

  const marcarComoAssistido = (filme) => {
    axios.post(`${baseURL}/adicionar-filme-assistido`, {
      movie: filme
    })
    .then(response => {
      console.log("Filme assistido enviado:", response.data.message);
    })
    .catch(error => {
      console.error("Erro ao enviar o filme assistido:", error);
    });
  }

  const movieSelect = (filme) => {
    axios.post(`${baseURL}/adicionar-filme-selecionado`, {
      filme_selecionado: filme
    })
    .then(response => {
      console.log("Filme selecionado enviado:", response.data.message);
    })
    .catch(error => {
      console.error("Erro ao enviar o filme selecionado:", error);
    });
  }


  return (
    <div className="container_movie_selection">
      <div className="container-info-carrousel">

        {/* DIV INFORMAÇÕES DO FILME DESTACADO */}
        <div className="container-info-filme">
          <div class="infos-infofilmes">
            <h3 id="titulo">{filmeAtual.title_pt}</h3>
            <div className="detalhes">
              <div className="detalhe-nota"><span className="star">★</span> {parseFloat(filmeAtual.review).toFixed(1)}/10 IMDb</div>
              <div className="subdetails">
                <div className="detalhe-item">{filmeAtual.director}</div>
                <div className="detalhe-item">{formatTime(filmeAtual.runtime)}</div>
              </div>
            </div>
            <p id="sinopse-texto">{filmeAtual.overview}</p>
          </div>
        </div>

        <div className="tentativa">
          <div className="movie-highlight">
            <img src={filmeAtual.poster_path} alt={filmeAtual.title_pt} />
            <div className="button-div">
              <button
                className="carousel-btn left"
                onClick={() => setSelectedFilmIndex(prev => Math.max(prev - 1, 0))}
                disabled={selectedFilmIndex === 0}
              >
                {"<"}
              </button>

              <button className="like-button" onClick={() => (movieSelect(filmeAtual), navigate("/ultima_pagina", { state: { filme: filmeAtual }}))}>❤</button>
              <button className="movie-watch-button" onClick={() => marcarComoAssistido(filmeAtual)}> Já assisti esse filme </button>

              <button
                className="carousel-btn right"
                onClick={() => setSelectedFilmIndex(prev => Math.min(prev + 1, dataDict.title_pt.length - 1))}
                disabled={selectedFilmIndex >= dataDict.title_pt.length - 1}
              >
                {">"}
              </button>
            </div>
          </div>
          <div className="movie-carousel" 
            style={{
              transform: `translateX(-${selectedFilmIndex * 21}%)`, // Aplicar a rolagem
            }}
          >
            {dataDict.title_pt.map((title, index) => {
              // Exclui o filme atual do carrossel
              if (index === selectedFilmIndex) return null;
              return (
                <div
                  key={index}
                  className={`movie-item ${index === selectedFilmIndex ? "highlighted" : ""}`}
                  onClick={() => setSelectedFilmIndex(index)}
                >
                  <img src={posterBaseURL + dataDict.poster_path[index]} alt={title} />
                </div>
              );
            })}
            <div
              className=" movie item refazer-card"
              onMouseEnter={() => setShowRefazerText(true)}
              onMouseLeave={() => setShowRefazerText(false)}
              onClick={() => navigate("/filtros")}
            >
              {showRefazerText ? <span className="refazer-text">Refazer seleção?</span> : <span className="plus-icon">+</span>}
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default MovieSelection;
