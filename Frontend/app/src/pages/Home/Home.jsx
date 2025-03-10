import React from "react"; 
import { useNavigate } from "react-router-dom";
import './Home.css';

import HomeImage from '../../assets/Fundo_Home.png'; 

const HomePage = () => {
    return (
        <div id="conteiner_home_page">
            <div className="background-home">
                <img src={HomeImage} className="home-image"/>
            </div>

            <div className="content">
                <h1 className="titulo">Descubra seu próximo filme favorito!</h1>
                <p className="descricao">
                    Está em dúvida sobre o que assistir? O Cinematch usa inteligência artificial para encontrar o filme ideal 
                    para você, levando em conta seus gêneros favoritos, o tempo disponível e a classificação indicativa.
                    Basta ajustar suas preferências e deixar a IA sugerir opções que combinam com o seu momento. Diga
                    adeus à indecisão e aproveite mais o seu tempo assistindo ao que realmente gosta!
                </p>
        
            </div>

        </div>
            
    );
};

export default HomePage;