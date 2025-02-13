import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { baseURL } from "../services/config";

function Login() {
  const navigate = useNavigate();
  const [text_key, setTextKey] = useState("");
  const [text_password, setTextPassword] = useState("");
  const [text_user, setTextUser] = useState("");
  
  // Função para enviar os dados ao backend
  const enviarDadosParaBackend = () => {
    if (!text_key, !text_password, !text_user) {
      alert("Digite algo antes de enviar!");
      return;
    }

    axios
      .post(`${baseURL}/receber_chave`, {
        user: text_user, // Enviando o valor digitado
        password: text_password, // Enviando o valor digit
        key: text_key, // Enviando o valor digitado
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
        <div className="container_informations">
          <div className="container_title_input">
            <p className="mt-2">Usuário</p>
            <input
                type="text"
                placeholder="Digite seu usuário..."
                value={text_user}
                onChange={(e) => setTextUser(e.target.value)}
                className="input_box"
            />
          </div>
          <div className="container_title_input">
            <p className="mt-2">Senha</p>
            <input
                type="password"
                placeholder="Digite sua senha..."
                value={text_password}
                onChange={(e) => setTextPassword(e.target.value)}
                className="input_box"
            />
          </div>
          <div className="container_title_input">
            <p className="mt-2">Senha API</p>
            <input
                type="text"
                placeholder="Digite sua senha OpenAI API..."
                value={text_key}
                onChange={(e) => setTextKey(e.target.value)}
                className="input_box"
            />
          </div>
          <button
              onClick={enviarDadosParaBackend}
              className="button_config"
          >
              Enviar
          </button>
        </div>  
      </div>
  );
}

export default Login;
