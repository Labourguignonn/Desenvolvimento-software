import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GenreSelection from "./pages/escolha_gêneros"
import TimeSelection from "./pages/escolha_tempo"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/escolha_gêneros" element={<GenreSelection />} />
        <Route path="/escolha_tempo" element={<TimeSelection />} />
        <Route path="/" element={<GenreSelection />} /> {/* Rota inicial */}
      </Routes>
    </Router>
  );
};

export default App;
