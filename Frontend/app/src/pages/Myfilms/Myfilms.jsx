import React, { useState, useEffect } from "react";
import './Myfilms.css';
import { useLocation } from "react-router-dom";

import lalalandimage from '../../assets/poster.jpg'
import duneimage from '../../assets/duna.webp'
import usimage from '../../assets/us.jpg'
import midnightinparisimage from '../../assets/meianoiteemparis.jpg'
import astarisbornimage from '../../assets/astarisborn.jpg'
import insideoutimage from '../../assets/divertidamente.webp'
import jokerimage from '../../assets/coringa.webp'
import poorthingsimage from '../../assets/poorthings.webp'
import challengersimage from '../../assets/challengers.jpg'

import imagemFundo from '../../assets/fundo_meusfilmes.webp'

const movies = [
  { title: "La La Land", img: lalalandimage },
  { title: "Duna", img: duneimage },
  { title: "Us", img: usimage },
  { title: "Midnight in Paris", img: midnightinparisimage },
  { title: "A Star Is Born", img: astarisbornimage },
  { title: "Divertida Mente", img: insideoutimage },
  { title: "Coringa", img: jokerimage },
  { title: "Poor Things", img: poorthingsimage },
  { title: "Challengers", img: challengersimage },
  { title: "Clube da Luta", img: lalalandimage},
];

const Myfilms = () => {
    const [loaded, setLoaded] = useState(false);

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
            <h1 className="title-myfilms">Meus filmes selecionados</h1>
            <div className="myfilms">
                <div className="movie-grid">
                    {movies.map((movie, index) => (
                        <div key={index} className="movie-card">
                            <img src={movie.img} alt={movie.title} className="movie-image" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Myfilms;