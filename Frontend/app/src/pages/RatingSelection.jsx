import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/RatingSelection.css";
import ErrorMessage from "../components/ErrorMessage";
import BackButton from "../components/BackButton";
import NextButton from "../components/NextButton";
import { baseURL } from "../services/config";

function RatingSelection() {
  const navigate = useNavigate();
  const [selectedRating, setSelectedRating] = useState(null);  // Unificando o estado
  const [labelSelecionado, setLabelSelecionado] = useState(null);
  const [errorRatingEmpty, setErrorRatingEmpty] = useState(false);

  const ratings = [
    { label: "L", desc: "Livre para todos os públicos", value: "G" },
    { label: "10", desc: "Não recomendado p/ menores de 10 anos", value: "G" },
    { label: "12", desc: "Não recomendado p/ menores de 12 anos", value: "PG" },
    { label: "14", desc: "Não recomendado p/ menores de 14 anos", value: "PG-13" },
    { label: "16", desc: "Não recomendado p/ menores de 16 anos", value: "R" },
    { label: "18", desc: "Não recomendado p/ menores de 18 anos", value: "R" },
  ];

  const handleClick = (value, label) => {
    setSelectedRating(value);  // Atualizando o estado de seleção
    setLabelSelecionado(label);
  };

  const handleNavButtonClick = () => {
    if (selectedRating) {
      enviarDadosParaBackend(selectedRating);
    } else {
      setErrorRatingEmpty(true);
    }
  };

  const enviarDadosParaBackend = async (botaoClicado) => {
    try {
      const response = await axios.post(`${baseURL}/selecionar_classificacao`, {
        botaoClicado,
      });
      console.log("Dados enviados com sucesso:", response.data);
      navigate("/carregamento");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <div className="container_rating_selection">
      <div className="lado_esquerdo">
        <h1 className="titulo"> Restrição <br /> de <br /> Idade</h1>
      </div>
      <div className="lado_direito">
        {ratings.map(({ label, desc, value }) => (
          <button
            key={label}
            className={`button-option ${labelSelecionado === label ? 'selected' : ''}`}
            id={`${label}`}
            onClick={() => handleClick(value, label)}  // Passando o valor correto
          >
            <div className={`value`} id={`value-${label}`}>{label}</div>
            <div className={`option`} id={`option-${label}`}>{desc}</div>
          </button>
        ))}
      </div>

      {/* Passando a função de envio para o NextButton */}
      <BackButton backLink="/escolha_tempo" />
      <NextButton proceedLink="/carregamento" onProceedClick={handleNavButtonClick} />  {/* Passei a função diretamente aqui */}

      {errorRatingEmpty && (
        <ErrorMessage
          message="Selecione uma classificação indicativa"
          onClose={() => setErrorRatingEmpty(false)}
        />
      )}
    </div>
  );
}

export default RatingSelection;
