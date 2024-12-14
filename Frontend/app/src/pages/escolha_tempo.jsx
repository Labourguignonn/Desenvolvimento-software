import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/escolha_tempo.css";

const TimeSelection = () => {
  const navigate = useNavigate();

  const times = [
    { label: "1h30", value: "1h30" },
    { label: "1h45", value: "1h45" },
    { label: "2h00", value: "2h00" },
    { label: "2h30", value: "2h30" },
    { label: "3h00", value: "3h00" },
    { label: "Longo", value: "3h30" },
  ];

  const [selectedTime, setSelectedTime] = useState(times[0].value);

  const handleTimeClick = (time) => {
    setSelectedTime(time.value);
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
      <button className="nav-button-right" onClick={() => navigate('/Filtroidade')}>→</button>
    </div>
  );
};

export default TimeSelection;
