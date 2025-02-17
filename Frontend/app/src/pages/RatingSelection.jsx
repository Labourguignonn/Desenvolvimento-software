import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/RatingSelection.css";
import { baseURL } from "../services/config";

function RatingSelection() {
  const navigate = useNavigate();
  const [botaoSelecionado, setBotaoSelecionado] = useState(null);
  const [labelSelecionado, setLabelSelecionado] = useState(null);
  const [errorRatingEmpty, setErrorRatingEmpty] = useState(false);

  const handleClick = (botao, label) => {
    setBotaoSelecionado(botao);
    setLabelSelecionado(label);
  };

  const handleNavButtonClick = () => {
    if (botaoSelecionado) {
      enviarDadosParaBackend(botaoSelecionado);
      navigate("/carregamento");
    } else {
      setErrorRatingEmpty(true);
    }
  };

  const handleRefazerSelection = () => {
    setErrorRatingEmpty(false);
  };

  const enviarDadosParaBackend = async (botaoClicado) => {
    try {
      const response = await axios.post(`${baseURL}/selecionar_classificacao`, {
        botaoClicado,
      });
      console.log("Dados enviados com sucesso:", response.data);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <div className="container_rating_selection">
      <div className="lado_esquerdo">
        <h1 className="titulo"> Restrição <br /> de <br /> Idade</h1>
      </div>
      <div className="lado_direito">
        {[
          { label: "L", desc: "Livre para todos os públicos", value: "G" },
          { label: "10", desc: "Não recomendado p/ menores de 10 anos", value: "G" },
          { label: "12", desc: "Não recomendado p/ menores de 12 anos", value: "PG" },
          { label: "14", desc: "Não recomendado p/ menores de 14 anos", value: "PG-13" },
          { label: "16", desc: "Não recomendado p/ menores de 16 anos", value: "R" },
          { label: "18", desc: "Não recomendado p/ menores de 18 anos", value: "R" },
        ].map(({ label, desc, value }) => (
          <button
            key={label}
            className={`button-option ${labelSelecionado === label ? 'selected' : ''}`}
            id={`${label}`}
            onClick={() => handleClick(value, label)}
          >
            <div className={`value`} id={`value-${label}`}>{label}</div>
            <div className={`option`} id={`option-${label}`}>{desc}</div>
          </button>
        ))}
      </div>

      <button className="button-left" onClick={() => navigate("/escolha_tempo")}>
        <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
        <span className="text">Voltar</span>
        <span className="circle"></span>
        <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
      </button>

      <button className="button-right" onClick={handleNavButtonClick}>
        <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
          ></path>
        </svg>
        <span class="text">Prosseguir</span>
        <span class="circle"></span>
        <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
          ></path>
        </svg>
      </button>

      {errorRatingEmpty && (
        <div className="error-message">
          <button className="refazer-button" onClick={handleRefazerSelection}>
            <div className="error">
              <div className="error__close">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 20 20" height="20">
                  <path fill="#393a37" d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"></path>
                </svg>
              </div>
              <div className="message-error">
                <div className="error__icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" height="24" fill="none">
                    <path fill="#393a37" d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"></path>
                  </svg>
                </div>
                <div className="error__title">Selecione uma classificação indicativa</div>
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default RatingSelection;


