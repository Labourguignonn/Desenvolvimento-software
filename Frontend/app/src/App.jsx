import React from "react";
// import 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer";
import GenreSelection from "./pages/escolha_generos";
import TimeSelection from "./pages/escolha_tempo";
import Filtroidade from "./pages/Filtroidade.jsx";
import Carregamento from "./pages/carregamento.jsx";
import Selection from "./pages/selection.jsx";
import InfoFilmes from "./pages/InfoFilmes.jsx";
import LastPage from "./pages/LastPage.jsx";
import axios from "axios";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<FiltroGenero />} />
        <Route path="/filtro_genero" element={<GenreSelection />} />
        <Route path="/escolha_tempo" element={<TimeSelection />} />
        <Route path="/Filtroidade" element={<Filtroidade />} />
        <Route path="/carregamento" element={<Carregamento />} />
        <Route path="/InfoFilmes" element={<InfoFilmes />} />
        <Route path="/Selection" element={<Selection />} />
        <Route path="/LastPage" element={<LastPage />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
