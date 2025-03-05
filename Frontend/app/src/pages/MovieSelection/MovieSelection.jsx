import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./MovieSelection.css";
import { baseURL } from "../../services/config";

function MovieSelection() {
  const navigate = useNavigate();
  const [currentFilmIndex, setCurrentFilmIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dataDict, setDataDict] = useState(null);

  const filmeIndex = useLocation().state?.index || 0;
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

  useEffect(() => {
    setCurrentFilmIndex(filmeIndex);
  }, [filmeIndex]);

  useEffect(() => {
    if (!loading && (!dataDict || !dataDict.title_pt.length)) {
      navigate("/final_da_fila");
    }
  }, [loading, dataDict, navigate]);

  const filmeAtual = dataDict?.title_pt[currentFilmIndex] ? {
    title_pt: dataDict.title_pt[currentFilmIndex],
    poster_path: dataDict.poster_path?.[currentFilmIndex] ? 
                 posterBaseURL + dataDict.poster_path[currentFilmIndex] : 
                 "URL da imagem padrão",
    overview: dataDict.overview?.[currentFilmIndex] || "Descrição não disponível",
    director: dataDict.director?.[currentFilmIndex] || "Diretor não informado",
    runtime: dataDict.runtime?.[currentFilmIndex] || "Duração não informada",
    review: dataDict.review?.[currentFilmIndex] || "Nota não informada",
  } : null;

  return (
    <div className="container_movie_selection">
      {loading ? (
        <p>Carregando filmes...</p>
      ) : filmeAtual ? (
        <div id="conteinerFilme">
          <div className="poster">
            <img id="filmeSelection" src={filmeAtual.poster_path} alt={filmeAtual.title_pt} />
          </div>
          <div className="selecao">
            <h3>{filmeAtual.title_pt}</h3>
            <p>Você já assistiu a esse filme?</p>
            <div className="botoes-container">
              <button className="botao-selecao" onClick={() => setCurrentFilmIndex(prev => Math.max(prev - 1, 0))}>
                Filme Anterior
              </button>
              <button className="botao-selecao" onClick={() => navigate("/info_filmes", {
                state: { filme: filmeAtual, index: currentFilmIndex + 1, dataDict }
              })}>
                Não
              </button>
              <button className="botao-selecao" onClick={() => setCurrentFilmIndex(prev => prev + 1)}>
                Próximo Filme
              </button>
            </div>
            <div className="indicador">
              <p>{currentFilmIndex + 1} de {dataDict.title_pt.length}</p>
            </div>
          </div>
        </div>
      ) : navigate("/final_da_fila")}
    </div>
  );
}

export default MovieSelection;
