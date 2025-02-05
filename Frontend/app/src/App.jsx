import React from "react";
// import 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import GenreSelection from "./pages/escolha_generos";
import TimeSelection from "./pages/escolha_tempo";
import Filtroidade from "./pages/Filtroidade.jsx";
import Carregamento from "./pages/carregamento.jsx";
import Selection from "./pages/selection.jsx";
import InfoFilmes from "./pages/InfoFilmes.jsx";
import LastPage from "./pages/LastPage.jsx";
import FinalDaFila from './pages/finaldafila.jsx'; 
import "./App.css"
import axios from "axios";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/escolha_generos" element={<GenreSelection />} />
        <Route path="/escolha_tempo" element={<TimeSelection />} />
        <Route path="/escolha_classificacao" element={<Filtroidade />} />
        <Route path="/carregamento" element={<Carregamento />} />
        <Route path="/info_filmes" element={<InfoFilmes />} />
        <Route path="/seleção" element={<Selection />} />
        <Route path="/final_da_fila" element={<FinalDaFila />} /> 
        <Route path="/ultima_pagina" element={<LastPage />} />
      </Routes>
    </Router>
  );
};

export default App;
