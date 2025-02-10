import React from "react";
// import 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import GenreSelection from "./pages/GenreSelection.jsx"
import RuntimeSelection from "./pages/RuntimeSelection.jsx";
import RatingSelection from "./pages/RatingSelection.jsx";
import Loading from "./pages/Loading.jsx";
import MovieSelection from "./pages/MovieSelection.jsx";
import InfoMovies from "./pages/InfoMovies.jsx";
import LastPage from "./pages/LastPage.jsx";
import EmptyLine from './pages/EmptyLine.jsx'; 
import "./App.css"

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/escolha_generos" element={<GenreSelection />} />
        <Route path="/escolha_tempo" element={<RuntimeSelection />} />
        <Route path="/escolha_classificacao" element={<RatingSelection />} />
        <Route path="/carregamento" element={<Loading />} />
        <Route path="/info_filmes" element={<InfoMovies />} />
        <Route path="/seleção" element={<MovieSelection />} />
        <Route path="/final_da_fila" element={<EmptyLine />} /> 
        <Route path="/ultima_pagina" element={<LastPage />} />
      </Routes>
    </Router>
  );
};

export default App;
