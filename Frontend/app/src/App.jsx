import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GenreSelection from "./pages/escolha_generos";
import TimeSelection from "./pages/escolha_tempo";
import Filtroidade from "./pages/Filtroidade.jsx";
import Carregamento from "./pages/carregamento.jsx";
import Selection from "./pages/selection.jsx";
import InfoFilmes from "./pages/InfoFilmes.jsx";
import LastPage from "./pages/LastPage.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: "10vh" }}></div>
      <Routes>
        <Route path="/" element={<GenreSelection />} />
        <Route path="/escolha_generos" element={<GenreSelection />} />
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
