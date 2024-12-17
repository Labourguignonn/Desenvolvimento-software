import React from "react";
import '../styles/LastPage.css';

const LastPage = () => {
  return (
    <div id="conteiner-lastpage">
      <p className="last-page-text">Hora da pipoca</p>
      <iframe
        src="https://giphy.com/embed/pUeXcg80cO8I8"
        className="giphy-embed"
        allowFullScreen
        title="Hora da Pipoca"
      ></iframe>
    </div>
  );
};

export default LastPage;
