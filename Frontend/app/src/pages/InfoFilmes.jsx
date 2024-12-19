import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/InfoFilmes.css';

function InfoFilmes() {
  const navigate = useNavigate();
  
  // Recuperando o filme, o índice e o dicionário de filmes passados na navegação
  const location = useLocation();
  const filme = location.state?.filme; // O filme foi passado através de `state`
  const filmeIndex = location.state?.index; // O índice do filme na lista
  const dataDict = location.state?.dataDict; // O dicionário de filmes completo

  // Caso o filme não tenha sido passado corretamente, exibe um erro
  if (!filme) {
    return <div>Erro: Nenhum filme encontrado!</div>;
  }

  // Você pode usar `dataDict` aqui para acessar outros filmes, se necessário
  console.log("Dicionário de filmes:", dataDict);

  return (
    <>
      <div className="container-geral">
        <div className="container-info-filme">
          <div id="poster">
            {/* Exibindo a imagem do filme */}
            <img
              id="filme-selection"
              src={filme.poster_path}  // Aqui agora você deve usar o `poster_path` completo
              alt={filme.title}
            />
          </div>

          <div id="infos-infofilmes">
            <h3 id="titulo">{filme.title}</h3>
            <p id="sinopse-texto">{filme.overview}</p>
            <div id="detalhes">
              <div className="detalhe-item">
                <strong>Ano: </strong><span>{filme.runtime}</span>
              </div>
              <div className="detalhe-item">
                <strong>Diretor: </strong><span>{filme.Diretor}</span>
              </div>
              <div className="detalhe-item">
                <strong>Duração: </strong><span>{filme.runtime}</span>
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
                onClick={() => navigate("/Selection", { state: { index: filmeIndex, dataDict: dataDict } })}
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
