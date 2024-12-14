import React from "react";
import { useNavigate } from 'react-router-dom'; // Importando o useNavigate
import '../styles/InfoFilmes.css';

function InfoFilmes() {
  // Usando o hook useNavigate para navegação
  const navigate = useNavigate();

  return (
    <>
      {/* Contêiner principal */}
      <div className="container-geral">

        {/* Contêiner das informações do filme */}
        <div className="container-info-filme">
          <div id="poster">
            <img
              id="filme-selection"
              src="https://br.web.img3.acsta.net/c_310_420/pictures/17/10/16/20/52/4165591.jpg"
              alt="Pelé: O Nascimento de uma Lenda"
            />
          </div>

          <div id="infos-infofilmes">
            <h3 id="titulo">Pelé: O Nascimento de uma Lenda (2016)</h3>
            <p id="sinopse-texto">
              "Pelé: O Nascimento de uma Lenda" é um filme biográfico lançado em 2016, que conta a história do jovem Pelé (interpretado por Kevin de Paula), desde sua infância nas favelas de Santos até sua ascensão como o maior jogador de futebol do Brasil. O filme narra as dificuldades que Pelé enfrentou, sua luta por reconhecimento e seu papel decisivo na vitória da seleção brasileira na Copa do Mundo de 1958, quando ele se tornou o jogador mais jovem a conquistar o título mundial.
            </p>
            <div id="detalhes">
              <div className="detalhe-item">
                <strong>Ano: </strong><span>2016</span>
              </div>
              <div className="detalhe-item">
                <strong>Diretor: </strong><span>Jeff Zimbalist, Michael Zimbalist</span>
              </div>
              <div className="detalhe-item">
                <strong>Duração: </strong><span>107 min</span>
              </div>
              <div className="detalhe-item">
                <strong>Onde Assistir: </strong>
                <span>Verifique a disponibilidade em plataformas de streaming.</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contêiner com a pergunta */}
        <div className="container-pergunta">
          <div id="pergunta-infofilmes">
            <p>Ficou com vontade de assistir?</p>
            <div id="botoes">
              <button
                className="botao-infofilmes"
                onClick={() => navigate("/LastPage")} // Ação de navegação ao clicar
              >
                Sim
              </button>
              <button
                className="botao-infofilmes"
                onClick={() => navigate("/Selection")} // Ação de navegação ao clicar
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
