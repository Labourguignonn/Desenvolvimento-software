import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/MovieSelection.css";
import { baseURL } from "../services/config";

function MovieSelection() {
  const navigate = useNavigate();

  const [currentFilmIndex, setCurrentFilmIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dataDict, setDataDict] = useState(null);

  const location = useLocation();
  const filmeIndex = location.state?.index || 0;


  const posterBaseURL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await axios.get(`${baseURL}/entregar-filmes`);
        const dataDict = response.data.data_dict;

        if (dataDict && dataDict.title_pt) {
          setDataDict(dataDict);
          setLoading(false);
        } else {
          console.error("Estrutura de dados inválida ou vazia:", dataDict);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar filmes da API:", error);
        setLoading(false);
      }
    };

    fetchFilmes();
  }, []);

  useEffect(() => {
    if (!loading && (!dataDict || !dataDict.title_pt.length)) {
      console.log("Sem filmes disponíveis. Redirecionando...");
      navigate("/final_da_fila");
    }
  }, [loading, dataDict, navigate]);

  // Atualiza o índice do filme atual e verifica se é o último
  useEffect(() => {
    setCurrentFilmIndex(filmeIndex);
  }, [filmeIndex]);


  const proximoFilme = () => {
    if (dataDict && currentFilmIndex < dataDict.title_pt.length - 1) {
      setCurrentFilmIndex(currentFilmIndex + 1);
    } else {
      console.log("Fim da lista de filmes. Redirecionando...");
      navigate("/final_da_fila");
    }
  };

  const filmeAtual = dataDict && dataDict.title_pt[currentFilmIndex] ? {
    title_pt: dataDict.title_pt[currentFilmIndex],
    poster_path: dataDict.poster_path?.[currentFilmIndex]
      ? posterBaseURL + dataDict.poster_path[currentFilmIndex]
      : "URL da imagem padrão", // Usa uma URL padrão se o poster_path não for encontrado
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
          <img
            id="filmeSelection"
            src={filmeAtual.poster_path}
            alt={filmeAtual.title_pt}
          />
          <h3>{filmeAtual.title_pt}</h3>
          <div id="pergunta">
            <div>
              <p>Você já assistiu a esse filme?</p>
            </div>
            <div>
              <button className="botao-selecao" onClick={proximoFilme}>
                Sim
              </button>
              <button
                className="botao-selecao"
                onClick={() =>
                  navigate("/info_filmes", {
                    state: {
                      filme: filmeAtual,
                      index: currentFilmIndex + 1,
                      dataDict: dataDict,
                    },
                  })
                }
              >
                Não
              </button>
            </div>
          </div>
        </div>
      ) : (
        navigate("/final_da_fila")
      )}
    </div>
  );
}

export default MovieSelection;
