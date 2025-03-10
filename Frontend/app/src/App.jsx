import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar.jsx";
import Login from "./pages/Login/Login.jsx";
import FiltersPage from "./pages/FiltersPage/FiltersPage.jsx";
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
        <Route path="/" element={<Login />} />
        <Route path="/filtros" element={<FiltersPage />} />
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
