import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../styles/escolha_tempo.css";

const TimeSelection = () => {
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
      .post("http://localhost:5000/api/tempo", { time: selectedTime }) // Envia o tempo ao backend
      .then((response) => {
        console.log("Tempo enviado com sucesso:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao enviar tempo:", error);
      });
  };

  return (
    <div className="container-tempo">
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
      <button className="nav-button-left" onClick={() => navigate('/escolha_generos')}>←</button>
      
      {/* Botão que envia o tempo ao backend antes de navegar */}
      <button
        className="nav-button-right"
        onClick={() => {
          enviarTempoParaBackend(); // Envia o tempo ao backend
          navigate('/Filtroidade'); // Navega para a próxima página
        }}
      >
        →
      </button>
    </div>
  );
};

export default TimeSelection;
