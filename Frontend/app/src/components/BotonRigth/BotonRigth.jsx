import React from 'react';
import './BotonRigth.css';

export const BotonRight = ({ handleSubmit }) => {
  return (
    <button className="button-right" onClick={handleSubmit}>
      <span className="arrow"></span> 
      <span className="circle"></span>
    </button>
  );
};
