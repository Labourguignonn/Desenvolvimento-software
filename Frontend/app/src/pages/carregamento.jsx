import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/stylecarregamento.css'

function Carregamento(){

    return (
        <div class="central">
            <div>
            <img src="assets/loader.gif" alt="Descrição do GIF" class="gif-style"/>
            <div class="titulo">
                <h1>Carregando seus filmes...</h1>
            </div>
            </div>
        </div>
    )

}

export default Carregamento