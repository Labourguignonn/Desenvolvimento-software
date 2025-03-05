import React from "react";
import './ErrorMessage.css'; // Importando o arquivo CSS

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="error-message">
      <button className="refazer-button" onClick={onClose}>
        <div className="error">
          <div className="error__close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <path fill="#393a37" d="M15.8333 5.34166l-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"/>
            </svg>
          </div>
          <div className="message-error">
            <div className="error__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill="#393a37" d="M13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612..."/>
              </svg>
            </div>
            <div className="error__title">{message}</div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ErrorMessage;