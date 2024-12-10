import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";  // Importando Navbar
import Footer from "./components/Footer";  // Importando Footer
import Home from "./pages/Home";      // Importando Home
import Selection from "./pages/Selection";      // Importando Home
import InfoFilmes from "./pages/InfoFilmes";      // Importando Home
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Selection" element={<Selection />} />
        <Route path="/InfoFilmes" element={<InfoFilmes />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
