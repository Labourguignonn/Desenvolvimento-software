import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../styles/RuntimeSelection.css";
import { baseURL } from "../services/config";

const RuntimeSelection = () => {
  const navigate = useNavigate();

  const times = [
    { label: "1h30", value: "90" },
    { label: "1h45", value: "105" },
    { label: "2h00", value: "120" },
    { label: "2h30", value: "150" },
    { label: "3h00", value: "180" },
    { label: "Longo", value: "210" },
  ];

  const [selectedTime, setSelectedTime] = useState(times[0].value);

  const handleTimeClick = (time) => {
    setSelectedTime(time.value);
  };

  // Função para enviar o tempo ao backend
  const enviarTempoParaBackend = () => {
    axios
      .post(`${baseURL}/tempo`, { time: selectedTime }) // Envia o tempo ao backend
      .then((response) => {
        console.log("Tempo enviado com sucesso:", response.data);
        navigate('/escolha_classificacao');
      })
      .catch((error) => {
        console.error("Erro ao enviar tempo:", error);
      });
  };

  return (
    <div className="container_runtime_selection">
      <div className="left-section_tempo">
        <h1 className="title">Escolha <br /> do Tempo <br /> Disponível</h1>
      </div>

      <div className="right-section">
        <div className="timeline">
          {times.map((time, index) => (
            <div
              key={index}
              className={`time-point ${selectedTime === time.value ? "selected" : ""}`}
              onClick={() => handleTimeClick(time)}
            >
              <div className="time-label">{time.label}</div>
            </div>
          ))}
        </div>
      </div>
      <button className="button-left" onClick={() => navigate('/escolha_generos')}>
        <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
        <span className="text">Voltar</span>
        <span className="circle"></span>
        <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
      </button>

      {/* Botão que envia o tempo ao backend antes de navegar */}
      <button
        className="button-right"
        onClick={() => {
          enviarTempoParaBackend(); // Envia o tempo ao backend
        }}
      >
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
    </div>
  );
};

export default RuntimeSelection;
