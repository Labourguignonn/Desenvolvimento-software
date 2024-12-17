import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/selection.css';

function Selection() {
  const navigate = useNavigate();
  
  const filmes = [
    {
      titulo: "Mad Max: Estrada da Fúria",
      imagem: "https://m.media-amazon.com/images/S/pv-target-images/f751f274cb2835ccc6d09ff239383d3824d90fcca561a23c1480d1eb9bdee362.jpg",
      descricao: "Após ser capturado por Immortan Joe, um guerreiro das estradas chamado Max (Tom Hardy) se vê no meio de uma guerra mortal, iniciada pela Imperatriz Furiosa (Charlize Theron) na tentativa se salvar um grupo de garotas. Também tentanto fugir, Max aceita ajudar Furiosa em sua luta contra Joe e se vê dividido entre mais uma vez seguir sozinho seu caminho ou ficar com o grupo.",
      ano: "2015",
      diretor: "George Miller",
      duracao: "120 min",
      ondeAssistir: "Max, Prime Vídeo, Apple TV+",
    },
    {
      titulo: "Interstellar",
      imagem: "https://cinemaeargumento.com/wp-content/uploads/2014/11/interstellarposter.jpg",
      descricao: "Após ver a Terra consumindo boa parte de suas reservas naturais, um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie. Cooper (Matthew McConaughey) é chamado para liderar o grupo e aceita a missão sabendo que pode nunca mais ver os filhos. Ao lado de Brand (Anne Hathaway), Jenkins (Marlon Sanders) e Doyle (Wes Bentley), ele seguirá em busca de uma nova casa. Com o passar dos anos, sua filha Murph (Mackenzie Foy/Jessica Chastain) investirá numa própria jornada para também tentar salvar a população do planeta.",
      ano: "2014",
      diretor: "Christopher Nolan",
      duracao: "169 min",
      ondeAssistir: "Plataforma X",
    },
    {
      titulo: "Lisbela e o Prisioneiro",
      imagem: "https://m.media-amazon.com/images/I/616H6Wy5miL._SL1000_.jpg",
      descricao: "Lisbela é uma jovem sonhadora que adora filmes americanos e sonha com os heróis do cinema. Leléu é um malandro aventureiro e conquistador. Eles se conhecem e se apaixonam, mas Lisbela está noiva de outro homem.",
      ano: "2021",
      diretor: "Guel Arraes",
      duracao: "105 min",
      ondeAssistir: "Google Play",
    },
    {
      titulo: "Os Farofeiros",
      imagem: "https://br.web.img3.acsta.net/pictures/18/01/03/19/24/3938254.jpg",
      descricao: "Quatro colegas de trabalho se programam para curtir o feriado prolongado em uma casa de praia e, chegando lá, descobrem que se meteram em uma tremenda roubada. Para começar o destino não é Búzios, mas Maringuaba; a residência alugada é encontrada caindo aos pedaços, bem diferente do prometido; a praia está sempre cheia; e as confusões são inúmeras.",
      ano: "2018",
      diretor: "Roberto Santucci",
      duracao: "99 min",
      ondeAssistir: "Amazon Prime Video, YouTube (aluguel), Globo Play, Apple TV"
    }
  ];

  const location = useLocation();
  const filmeIndex = location.state?.index || 0; // Pegando o índice passado ou 0 caso não tenha sido passado

  const [currentFilmIndex, setCurrentFilmIndex] = useState(filmeIndex);

  useEffect(() => {
    setCurrentFilmIndex(filmeIndex); // Atualizando o índice do filme quando a página é carregada
  }, [filmeIndex]);

  const proximoFilme = () => {
    if (currentFilmIndex < filmes.length - 1) {
      setCurrentFilmIndex(currentFilmIndex + 1);
    } else {
      alert("Você assistiu todos os filmes!");
    }
  };

  return (
    <div className="home-container">
      <div id="conteinerFilme">
        <img
          id="filmeSelection"
          src={filmes[currentFilmIndex].imagem}
          alt={filmes[currentFilmIndex].titulo}
        />
        <h3>{filmes[currentFilmIndex].titulo}</h3>
        <div id="pergunta">
          <div>
            <p>Você já assistiu a esse filme?</p>
          </div>
          <div>
            <button
              className="botao-selecao"
              onClick={proximoFilme}
            >
              Sim
            </button>
            <button
              className="botao-selecao"
              onClick={() => navigate("/InfoFilmes", { state: { filme: filmes[currentFilmIndex], index: currentFilmIndex + 1 } })}
            >
              Não
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Selection;
