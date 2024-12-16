import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/stylecarregamento.css'

function Carregamento(){
        const [seconds, setSeconds] = useState(10); // Tempo inicial (em segundos)
        const navigate = useNavigate(); // Hook para navegar entre páginas
      
        useEffect(() => {
          if (seconds <= 0) {
            navigate("/selection"); // Transiciona para a próxima tela quando o timer zerar
            return;
          }
      
          // Reduz 1 segundo a cada 1000ms
          const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      
          // Limpa o temporizador ao desmontar ou atualizar
          return () => clearTimeout(timer);
        }, [seconds, navigate]);

    return (
        <div classname="central">
            <div id= "container_carregamento">
            <iframe 
                    src="https://giphy.com/embed/feN0YJbVs0fwA" 
                    width= "50" 
                    height="auto" 
                    class="giphy-embed" 
                    allowFullScreen>
                </iframe>
                <p className="last-page-text">Carregando seus filmes...</p>
            </div>         
        </div>
    )

}

export default Carregamento