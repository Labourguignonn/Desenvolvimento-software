import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

import "../styles/escolha_tempo.css";

const TimeSelection = () => {
  const navigate = useNavigate();

  const times = [
    { label: "Curto", value: "1h" },
    { label: "1h30", value: "1:30h" },
    { label: "2h", value: "2h" },
    { label: "2h30", value: "2:30h" },
    { label: "3h", value: "3h" },
    { label: "Longo", value: "3+h" },
  ];

  const [selectedTime, setSelectedTime] = useState(times[0].value);

  const handleTimeClick = (time) => {
    setSelectedTime(time.value);
  };

  return (
    <div className="container">

      <div className="left-section">

        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>

        <h1 className="title">
          Escolha <br /> do Tempo <br /> Disponível
        </h1>
      </div>

      <div className="right-section">

        <div className="timeline">
          {times.map((time, index) => (
            <div
              key={index}
              className={`time-point ${
                selectedTime === time.value ? "selected" : ""
              }`}
              onClick={() => handleTimeClick(time)}
            >
              <div className="time-label">{time.label}</div>
            </div>
          ))}
        </div>
        
      </div>

      <button className="nav-button-left" 
      onClick={() => navigate('/escolha_gêneros')}
      >←</button>
      <button className="nav-button-right">→</button>

    </div>
  );
};

export default TimeSelection;
