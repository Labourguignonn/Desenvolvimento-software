import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../../App.css'
import './NavBar.css'


function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav id="navBar">
      
      <div className="buttons-left">
        <button className={`button-home ${location.pathname === "/" ? "active" : ""}`} onClick={() => navigate("/")}>Home</button>
        <button className={`button-home ${location.pathname === "/filtros" ? "active" : ""}`} onClick={() => navigate("/filtros")}>Seleção de Filmes </button>
      </div>
      
      <div className="cinematch">cinematch</div>
      
      {location.pathname === "/" && (
        <div className="buttons-right">
          <button className="button-login" onClick={() => navigate("/login")}>Login</button>
          <button className="button-cadastro" onClick={() => navigate("/login")}>Cadastre-se</button>
        </div>
      )}

      {(location.pathname === "/filtros" || location.pathname === "/carregamento" || location.pathname === "/seleção" || location.pathname === "/final_da_fila" || location.pathname === "/ultima_pagina") && (
        <div className="username">{localStorage.getItem("username")}</div>
      )}

    </nav>
  );
}

export default Navbar;
