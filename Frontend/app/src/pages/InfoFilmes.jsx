import React from "react";
import './InfoFilmes.css';

function InfoFilmes() {
  return (
    <>
      <div id="conteiner-infofilmes">
        <div className="InfoFilme">
          <div id="poster">
            <img
              id="filmeSelection"
              src="https://br.web.img3.acsta.net/c_310_420/pictures/17/10/16/20/52/4165591.jpg"
            />
          </div>

          <div id="infos-infofilmes">
            <div id="sinopse">
              <h3 id="titulo">Pelé: O Nascimento de uma Lenda (2016)</h3>
              <p id="sinopse-texto">
                "Pelé: O Nascimento de uma Lenda" é um filme biográfico lançado em 2016, que conta a história do jovem Pelé (interpretado por Kevin de Paula), desde sua infância nas favelas de Santos até sua ascensão como o maior jogador de futebol do Brasil. O filme narra as dificuldades que Pelé enfrentou, sua luta por reconhecimento e seu papel decisivo na vitória da seleção brasileira na Copa do Mundo de 1958, quando ele se tornou o jogador mais jovem a conquistar o título mundial.
              </p>
            </div>

            <div id="detalhes">
              <div id="ano">
                <strong>Ano: </strong><span>2016</span>
              </div>
              <div id="diretor">
                <strong>Diretor: </strong><span>Jeff Zimbalist, Michael Zimbalist</span>
              </div>
              <div id="duracao">
                <strong>Duração: </strong><span>107 min</span>
              </div>
              <div id="onde-assistir">
                <strong>Onde Assistir: </strong><span>Verifique a disponibilidade em plataformas de streaming.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Novo contêiner para a pergunta */}
      <div id="pergunta-container">
        <div id="pergunta-infofilmes">
          <p>Ficou com vontade de assistir?</p>
          <div id="botoes">
            <button className="botao-infofilmes">Sim</button>
            <button className="botao-infofilmes">Não</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoFilmes;
