import React, { useState } from "react"; // Importando useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar.jsx";
import HomePage from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import FiltersPage from "./pages/FiltersPage/FiltersPage.jsx";
import Loading from "./pages/Loading/Loading.jsx";
import MovieSelection from "./pages/MovieSelection/MovieSelection.jsx";
import InfoMovies from "./pages/InfoMovies/InfoMovies.jsx";
import LastPage from "./pages/LastPage/LastPage.jsx";
import EmptyLine from './pages/EmptyLine/EmptyLine.jsx'; 
import Myfilms from './pages/Myfilms/Myfilms.jsx';
import "./App.css";

const App = () => {
  const [isLogged, setIsLogged] = useState(false); 
  const [username, setUsername] = useState(localStorage.getItem("username") || ""); 

  return (
    <Router>
      <Navbar isLogged={isLogged} setIsLogged={setIsLogged}/> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login setIsLogged={setIsLogged}/>} />
        <Route path="/filtros" element={<FiltersPage />} />
        <Route path="/carregamento" element={<Loading />} />
        <Route path="/info_filmes" element={<InfoMovies />} />
        <Route path="/seleção" element={<MovieSelection />} />
        <Route path="/meus_filmes" element={<Myfilms />} />
        <Route path="/final_da_fila" element={<EmptyLine />} /> 
        <Route path="/ultima_pagina" element={<LastPage />} />
      </Routes>
    </Router>
  );
};


export default App;