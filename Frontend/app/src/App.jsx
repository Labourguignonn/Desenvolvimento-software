import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar.jsx";
import Login from "./pages/Login/Login.jsx";
import FiltersPage from "./pages/FiltersPage/FiltersPage.jsx";
import GenreSelection from "./pages/GenreSelection/GenreSelection.jsx"
import RuntimeSelection from "./pages/RuntimeSelection/RuntimeSelection.jsx";
import RatingSelection from "./pages/RatingSelection/RatingSelection.jsx";
import Loading from "./pages/Loading/Loading.jsx";
import MovieSelection from "./pages/MovieSelection/MovieSelection.jsx";
import InfoMovies from "./pages/InfoMovies/InfoMovies.jsx";
import LastPage from "./pages/LastPage/LastPage.jsx";
import EmptyLine from './pages/EmptyLine/EmptyLine.jsx'; 
import "./App.css"

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<FiltersPage />} />
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
