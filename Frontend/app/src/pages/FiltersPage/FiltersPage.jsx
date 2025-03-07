import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../services/config";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "./FiltersPage.css"
import FirstImage from "../../assets/movie_images/top_images/01.jpg";

const FiltersPage = () => {
  const navigate = useNavigate();

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRefazer, setShowRefazer] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null);
  const [labelSelecionado, setLabelSelecionado] = useState(null);
  const [errorRatingEmpty, setErrorRatingEmpty] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [filledWidth, setFilledWidth] = useState(0);


  const [genres, setGenres] = useState([
    { label: "Ação", value: "Action" },
    { label: "Aventura", value: "Adventure" },
    { label: "Comédia", value: "Comedy" },
    { label: "Drama", value: "Drama" },
    { label: "Ficção Científica", value: "Science Fiction" },
    { label: "Mistério", value: "Mystery" },
    { label: "Romance", value: "Romance" },
    { label: "Terror", value: "Horror" },
    { label: "Animação", value: "Animation" },
  ]);

  const newGenres = [
    { label: "Documentário", value: "Documentary" },
    { label: "Musical", value: "Music" },
    { label: "Histórico", value: "History" },
    { label: "Guerra", value: "War" },
    { label: "Suspense", value: "Thriller" },
    { label: "Crime", value: "Crime" },
    { label: "Faroeste", value: "Western" },
    { label: "Fantasia", value: "Fantasy" },
  ];

  const times = [
    { label: "1h30", value: "90" },
    { label: "1h45", value: "105" },
    { label: "2h00", value: "120" },
    { label: "2h30", value: "150" },
    { label: "3h00", value: "180" },
    { label: "Longo", value: "210" },
  ];

  const ratings = [
    { label: "L", value: "G" },
    { label: "10", value: "G" },
    { label: "12", value: "PG" },
    { label: "14", value: "PG-13" },
    { label: "16", value: "R" },
    { label: "18", value: "R" },
  ];


  const toggleGenre = (genreValue) => {
    setSelectedGenres((prevSelected) => {
      const updatedSelection = prevSelected.includes(genreValue)
        ? prevSelected.filter((value) => value !== genreValue)
        : prevSelected.length < 3
          ? [...prevSelected, genreValue]
          : prevSelected;

      console.log("Gêneros selecionados:", updatedSelection);
      return updatedSelection;
    });
  };
  const handleTimeClick = (value, index) => {
    setSelectedTime(value);
    updateFilledLine(index);
    setSelectedTimeRange(index);
  };

  const updateFilledLine = (index) => {
    if (index === 0) {
      setFilledWidth(0); // Nenhuma largura quando o primeiro ponto não é selecionado
    } else {
      const newWidth = ((100 * index) / times.length) + index * 3; //((index/2)*1.5)*4
      setFilledWidth(newWidth);
    }
  };


  const addGenres = () => {
    setGenres((prevGenres) => {
      const availableGenres = newGenres.filter(
        (newGenre) => !prevGenres.some((g) => g.value === newGenre.value)
      );

      const shuffledGenres = availableGenres.sort(() => 0.5 - Math.random());
      const selectedNewGenres = shuffledGenres.slice(0, 3);
      console.log("Novos gêneros adicionados")
      return [...prevGenres, ...selectedNewGenres];
    });

    setTimeout(() => {
      if (genresContainerRef.current) {
        genresContainerRef.current.scrollTop = genresContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  const checkingFilters = () => {
    if ((selectedGenres.length <= 3 && selectedGenres.length > 0) && selectedTime && selectedRating) {
      enviarDadosParaBackend();
    } else {
      switch (true) {
        case selectedGenres.length > 3 || selectedGenres.length === 0:
          setShowRefazer(true);
          setSelectedGenres([]);
          break;
        case !selectedRating:
          setErrorRatingEmpty(true);
          break;
        default:
          console.error("Erro desconhecido.");
      }
    }
  };

  const enviarDadosParaBackend = async () => {
    try {
      const response = await axios.post(`${baseURL}/selecionar_filtros`, {
        selectedGenres,
        selectedTime,
        selectedRating
      });
      console.log("Dados enviados com sucesso:", response.data);
      navigate("/carregamento");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <>      <div className="image-top">
      <img
        src={FirstImage}
        alt="Imagem do Google Drive"
      />
    </div>
      <div className="main-conteiner">


        {/* Genre Selection */}
        <div className="container_genre_selection">

          <div className="section_title">
            <h1 className="poppins-title">Gêneros</h1>
            <p className="subtitle">Selecione até 3 gêneros.</p>
          </div>

          <div className="section-add-genres">
            <div className="genres-container">
              {loading ? (
                <div>Carregando gêneros...</div>
              ) : error ? (
                <div>{error}</div>
              ) : (
                genres.map((genre, index) => (
                  <button
                    key={index}
                    className={`genre-button ${selectedGenres.includes(genre.value) ? "selected" : ""}`}
                    onClick={() => toggleGenre(genre.value)}
                  >
                    {genre.label}
                  </button>
                ))
              )}
            </div>

            <div className="add_button-container">
              <button className="add-button" onClick={addGenres}> + </button>
            </div>

          </div>

          {showRefazer && (
            <ErrorMessage
              message="Por favor, selecione até 3 gêneros para continuar."
              onClose={() => setShowRefazer(false)}
            />
          )}
        </div>

        {/* Runtime Selection */}
        <div className="container_runtime_selection">
          <div className="section_title">
            <h1 className="poppins-title">Tempo Disponível</h1>
            <p className="subtitle">Selecione seu espaço de tempo disponível.</p>
          </div>

          <div className="section-time">
            <div className="timeline">
              <div className="filled" style={{ width: `${filledWidth}%` }}></div>
              {times.map((time, index) => (
                <div
                  key={index}
                  className={`time-point ${selectedTime === time.value || index <= times.findIndex(t => t.value === selectedTime) ? "selected" : ""}`}
                  onClick={() => handleTimeClick(time.value, index)}
                >
                  <div className="time-label">{time.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rating Selection */}
        <div className="container_rating_selection">

          <div className="section_title">
            <h1 className="poppins-title">Classificação Indicativa</h1>
            <p className="subtitle">Selecione a classificação indicativa desejada do filme.</p>
          </div>

          <div className="section-rating">
            {ratings.map(({ label, value }) => (
              <button
                key={label}
                id={`rating-${label.replace(/\s+/g, '-').toLowerCase()}`} // Gerando um ID único a partir do label
                className={`button-option ${labelSelecionado === label && "selected"}`}
                onClick={() => (setSelectedRating(value), setLabelSelecionado(label))}
              >
                <div className="value">{label}</div>
              </button>
            ))}
          </div>


          {errorRatingEmpty && (
            <ErrorMessage
              message="Selecione uma classificação indicativa"
              onClose={() => setErrorRatingEmpty(false)}
            />
          )}
        </div>

        {/* Submit Button */}
        <div className="Submit-Button">
          <button className="button-receive" onClick={checkingFilters}>
            Receber Filmes
          </button>
        </div>
      </div>
    </>
  );
};

export default FiltersPage;
