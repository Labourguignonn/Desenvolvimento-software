import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../styles/RuntimeSelection.css";
import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton";
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

  // Função para selecionar o tempo
  const handleTimeClick = (time) => {
    setSelectedTime(time.value);
  };

  // Função para enviar o tempo ao backend
  const enviarTempoParaBackend = () => {
    axios
      .post(`${baseURL}/tempo`, { time: selectedTime }) // Envia o tempo ao backend
      .then((response) => {
        console.log("Tempo enviado com sucesso:", response.data);
        // Após enviar o tempo, navega para a página de classificação
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

      <BackButton backLink="/escolha_generos" />
      <NextButton
        proceedLink="/escolha_classificacao"
        onProceedClick={enviarTempoParaBackend} // Passando a função de envio de tempo
      />
    </div>
  );
};

export default RuntimeSelection;
