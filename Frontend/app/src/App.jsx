import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GenreSelection from "./pages/escolha_generos"
import TimeSelection from "./pages/escolha_tempo"
import Filtroidade from './pages/Filtroidade.jsx'
import Carregamento from './pages/carregamento.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/escolha_generos" element={<GenreSelection />} />
        <Route path="/escolha_tempo" element={<TimeSelection />} />
        <Route path="/" element={<GenreSelection />} /> {/* Rota inicial */}
        <Route path="/Filtroidade" element={<Filtroidade />} />
        <Route path="/carregamento" element={<Carregamento />} />
      </Routes>
    </Router>
  );
};

export default App;
