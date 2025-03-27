import React, { useState, useEffect } from "react";
import axios from "axios";
import './Myfilms.css';
import { baseURL } from "../../services/config";
import imagemFundo from '../../assets/fundo_meusfilmes.webp';

const posterBaseURL = "https://image.tmdb.org/t/p/w500";  // Definindo a URL base dos pôsteres

const Myfilms = () => {
    const [loaded, setLoaded] = useState(false);
    const [movies, setMovies] = useState([]);  
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${baseURL}/mandar-filmes-assistido`)
            .then((response) => {
                console.log("Dados recebidos da API:", response.data);
                const data = response.data.watched_movies;  // Acessa diretamente watched_movies

                if (data) {
                    const filmesFormatados = Object.keys(data).map((titulo) => ({
                        title: titulo,  // O título é a chave do objeto
                        img: data[titulo].poster_path 
                            ? `${posterBaseURL}${data[titulo].poster_path}`  // Adiciona a URL base
                            : "URL_DA_IMAGEM_PADRÃO"
                    }));
                    setMovies(filmesFormatados);
                } else {
                    console.error("Estrutura de dados inválida:", data);
                }
            })
            .catch((error) => console.error("Erro ao buscar filmes:", error))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        const img = new Image();
        img.src = imagemFundo;
        img.onload = () => setLoaded(true);
    }, []);

    return (
        <div id="container_myfilms">
            <div className="background_myfilms">
                <img
                    src={imagemFundo}
                    className={`myfilms-image ${loaded ? 'loaded' : 'loading'}`}
                    alt="Fundo Meus Filmes"
                />
            </div>

            <div className="content-myfilms">
                <h1 className="title-myfilms">Meus filmes assistidos</h1>
                <div className="myfilms">
                    {loading ? (
                        <p>Carregando...</p>
                    ) : (
                        <div className="movie-grid">
                            {movies.map((movie, index) => (
                                <div key={index} className="movie-card">
                                    <img src={movie.img} alt={movie.title} className="movie-image" />
                                    <p>{movie.title}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Myfilms;
