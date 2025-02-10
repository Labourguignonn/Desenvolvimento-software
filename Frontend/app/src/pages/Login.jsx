import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { baseURL } from "../services/config";


function Login() {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  // Função para enviar os dados ao backend
  const enviarDadosParaBackend = () => {
    if (!text) {
      alert("Digite algo antes de enviar!");
      return;
    }

    axios
      .post(`${baseURL}/receber_chave`, {
        key: text, // Enviando o valor digitado
      })
      .then((response) => {
        console.log("Dados enviados com sucesso:", response.data);
        navigate("/escolha_generos"); // Navega após o envio
      })
      .catch((error) => {
        console.error("Erro ao enviar dados:", error);
      });
  };

  return (
      <div className="container_login">
        <p className="mt-2">SENHA API </p>
        <input
            type="text"
            placeholder="Digite sua senha OpenAI API..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input_box"
        />
        <button
            onClick={enviarDadosParaBackend}
            className="button_config"
        >
            Enviar
        </button>  
      </div>
  );
}

export default Login;