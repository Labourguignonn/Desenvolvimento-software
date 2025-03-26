import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import axios from "axios";
import "./Login.css";
import { baseURL } from "../../services/config";

// Exemplo de dados dos filmes (isso normalmente viria de uma API)
const filmesData = {
  data_dict: {
    title_pt: [
      'A Origem',
      'John Wick - De Volta ao Jogo',
      'Mad Max: Estrada da Fúria',
      'Homem-Aranha: No Aranhaverso',
      'Batman: O Cavaleiro das Trevas',
    ],
    title_en: [
      'Inception',
      'John Wick',
      'Mad Max: Fury Road',
      'Spider-Man: Into the Spider-Verse',
      'The Dark Knight',
    ],
    overview: [
      'Cobb é um ladrão habilidoso que comete espionagem...',
      'John Wick é um lendário assassino de aluguel aposentado...',
      'Em um mundo apocalíptico, Max Rockatansky acredita...',
      'Miles Morales é um jovem negro do Brooklyn que se tornou o Homem-Aranha...',
      'Após dois anos desde o surgimento do Batman...',
    ],
    runtime: [148, 101, 120, 117, 152],
    poster_path: [
      '/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg',
      '/4A9KmccvMqJA8MQzIes0G9Uobh5.jpg',
      '/mtgqrSlT47VsmeMVanLTny7BknB.jpg',
      '/sizv4fncWiCe8i5jWCA8xfqtCB9.jpg',
      '/4lj1ikfsSmMZNyfdi8R8Tv5tsgb.jpg',
    ],
    director: [
      'Christopher Nolan',
      'Chad Stahelski',
      'George Miller',
      'Bob Persichetti',
      'Christopher Nolan',
    ],
    review: ['8.369', '7.4', '7.62', '8.396', '8.5'],
  },
};

const FilmesAssistidos = () => {
  const [filmes, setFilmes] = useState([]);

  // Carregar os filmes quando o componente for montado
  useEffect(() => {
    const filmesList = filmesData.data_dict.title_pt.map((title, index) => ({
      title_pt: title,
      title_en: filmesData.data_dict.title_en[index],
      overview: filmesData.data_dict.overview[index],
      runtime: filmesData.data_dict.runtime[index],
      poster_path: filmesData.data_dict.poster_path[index],
      director: filmesData.data_dict.director[index],
      review: filmesData.data_dict.review[index],
    }));

    setFilmes(filmesList);
  }, []);

  return (
    <div className="filmes-container">
      <h1>Filmes Assistidos</h1>
      <div className="filmes-list">
        {filmes.map((filme, index) => (
          <div key={index} className="filme-card">
            <img
              src={filme.poster_path}
              alt={filme.title_pt}
              className="filme-poster"
            />
            <div className="filme-info">
              <h2>{filme.title_pt}</h2>
              <p><strong>Diretor:</strong> {filme.director}</p>
              <p><strong>Resumo:</strong> {filme.overview}</p>
              <p><strong>Duração:</strong> {filme.runtime} min</p>
              <p><strong>Avaliação:</strong> {filme.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmesAssistidos;
