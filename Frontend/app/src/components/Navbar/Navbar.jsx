import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../../App.css'
import './NavBar.css'


function Navbar({ isLogged }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav id="navBar">

      {isLogged ? (
        <>
          <div className="buttons-left">
            <button className={`button-home ${location.pathname === "/" ? "active" : ""}`} onClick={() => navigate("/")}>Home</button>
            <button className={`button-home ${location.pathname === "/filtros" ? "active" : ""}`} onClick={() => navigate("/filtros")}>Seleção de Filmes </button>
          </div>
          <div className="cinematch">cinematch</div>
          
          {(location.pathname === "/" || location.pathname === "/filtros" || location.pathname === "/carregamento" || location.pathname === "/seleção" || location.pathname === "/final_da_fila" || location.pathname === "/ultima_pagina" || location.pathname === "/meus_filmes") && (
            <button className={`username ${location.pathname === "/meus_filmes" ? "active" : ""}`} onClick={() => navigate("/meus_filmes")}>{localStorage.getItem("username")}</button>
          )}
        </>
      ) : (
        <>
          <div className="buttons-left">
            <button className={`button-home ${location.pathname === "/" ? "active" : ""}`} onClick={() => navigate("/")}>Home</button>
          </div>

          <div className="cinematch">cinematch</div>

          {location.pathname === "/" && (
            <div className="buttons-right">
              <button className="button-login" onClick={() => navigate("/login")}>Login</button>
              <button className="button-cadastro" onClick={() => navigate("/login")}>Cadastre-se</button>
            </div>
          )}
        </>
      )}

    </nav>
  );
}

export default Navbar;
