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
        <button className={`button-home ${location.pathname === "/home" ? "active" : ""}`} onClick={() => navigate("/home")}>Home</button>
        <button className={`button-home ${location.pathname === "/filtros" ? "active" : ""}`} onClick={() => navigate("/filtros")}>Seleção de Filmes </button>
      </div>
      
      <div className="cinematch">cinematch</div>
      
      {location.pathname === "/home" && (
        <div className="buttons-right">
          <button className="button-login" onClick={() => navigate("/")}>Login</button>
          <button className="button-cadastro" onClick={() => navigate("/")}>Cadastre-se</button>
        </div>
      )}

      {(location.pathname === "/filtros" || location.pathname === "/carregamento" || location.pathname === "/info_filmes" || location.pathname === "/seleção" || location.pathname ==="/final_da_fila" || location.pathname === "/ultima_pagina") && (
        <div className="username">username</div>
      )}

    </nav>
  );
}

export default Navbar;
