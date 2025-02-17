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
  const [hoveredButton, setHoveredButton] = useState(null);  // Estado para controlar o botão em hover

  const location = useLocation();
  const filmeIndex = location.state?.index || 0;

  const posterBaseURL = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await axios.get(`${baseURL}/entregar-filmes`);
        const dataDict = response.data.data_dict;

        if (dataDict && dataDict.title) {
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
    if (!loading && (!dataDict || !dataDict.title.length)) {
      console.log("Sem filmes disponíveis. Redirecionando...");
      navigate("/final_da_fila");
    }
  }, [loading, dataDict, navigate]);

  useEffect(() => {
    setCurrentFilmIndex(filmeIndex);
  }, [filmeIndex]);

  const proximoFilme = () => {
    if (dataDict && currentFilmIndex < dataDict.title.length - 1) {
      setCurrentFilmIndex(currentFilmIndex + 1);
    } else {
      console.log("Fim da lista de filmes. Redirecionando...");
      navigate("/final_da_fila");
    }
  };

  const filmeAnterior = () => {
    if (dataDict && currentFilmIndex > 0) {
      setCurrentFilmIndex(currentFilmIndex - 1);
    }
  };

  const filmeAtual = dataDict && dataDict.title[currentFilmIndex] ? {
    title: dataDict.title[currentFilmIndex],
    poster_path: dataDict.poster_path?.[currentFilmIndex]
      ? posterBaseURL + dataDict.poster_path[currentFilmIndex]
      : "URL da imagem padrão",
    overview: dataDict.overview?.[currentFilmIndex] || "Descrição não disponível",
    director: dataDict.director?.[currentFilmIndex]?.[0] || "Diretor não informado",
    runtime: dataDict.runtime?.[currentFilmIndex] || "Duração não informada",
  } : null;

  // Função para ativar/desativar hover no botão
  const handleMouseEnter = (buttonType) => {
    setHoveredButton(buttonType);  // Ativa o hover para o botão correspondente
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);  // Remove o hover
  };

  return (
    <div className="container_movie_selection">
      {loading ? (
        <p>Carregando filmes...</p>
      ) : filmeAtual ? (
        <div id="conteinerFilme">
          <div className="poster">
            <img
              id="filmeSelection"
              src={filmeAtual.poster_path}
              alt={filmeAtual.title}
            />
          </div>

          <div className="selecao">
            <h3>{filmeAtual.title}</h3>
            <div id="pergunta">
              <div>
                <p>Você já assistiu a esse filme?</p>
              </div>
              <div>
                <button
                  className={`botao-selecao ${hoveredButton === 'anterior' ? 'hover' : ''}`}
                  onClick={filmeAnterior}
                  onMouseEnter={() => handleMouseEnter('anterior')}
                  onMouseLeave={handleMouseLeave}
                >
                  Filme Anterior
                </button>
                <button
                  className={`botao-selecao ${hoveredButton === 'proximo' ? 'hover' : ''}`}
                  onClick={proximoFilme}
                  onMouseEnter={() => handleMouseEnter('proximo')}
                  onMouseLeave={handleMouseLeave}
                >
                  Próximo Filme
                </button>
                <button
                  className={`botao-selecao ${hoveredButton === 'nao' ? 'hover' : ''}`}
                  onClick={() =>
                    navigate("/info_filmes", {
                      state: {
                        filme: filmeAtual,
                        index: currentFilmIndex + 1,
                        dataDict: dataDict,
                      },
                    })
                  }
                  onMouseEnter={() => handleMouseEnter('nao')}
                  onMouseLeave={handleMouseLeave}
                >
                  Não
                </button>
              </div>
              <div className="indicador">
                <p>{currentFilmIndex + 1} de {dataDict.title.length}</p>
              </div>
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
