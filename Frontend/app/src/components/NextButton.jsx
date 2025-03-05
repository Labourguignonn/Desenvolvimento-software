// ProceedButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NextButton({ proceedLink, onProceedClick }) {
  const navigate = useNavigate();

  return (
    <button
      className="button-right"
      onClick={() => {
        if (onProceedClick) {
          onProceedClick();  // Executa a função que foi passada para onProceedClick
        } else {
          navigate(proceedLink);
        }
      }}
    >
      <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
        ></path>
      </svg>
      <span className="text">Prosseguir</span>
      <span className="circle"></span>
      <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
        ></path>
      </svg>
    </button>
  );
}

export default NextButton;
