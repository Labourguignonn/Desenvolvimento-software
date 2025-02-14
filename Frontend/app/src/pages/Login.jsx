import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { baseURL } from "../services/config";

function Login() {
  const navigate = useNavigate();
  const [text_key, setTextKey] = useState("");
  const [text_password, setTextPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmar senha
  const [text_user, setTextUser] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Estados para controle de visibilidade de senha
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showKey, setShowKey] = useState(false);

  // Função para verificar se o usuário já existe no banco de dados
  const verificarUsuario = async () => {
    try {
      const response = await axios.get(`${baseURL}/verificar-usuario`, {
        params: { username: text_user },
      });

      if (response.data.usuario_existe) {
        alert("Este usuário já existe. Tente outro.");
        return true; // O usuário já existe
      } else {
        return false; // O usuário não existe
      }
    } catch (error) {
      console.error("Erro ao verificar o usuário:", error);
      alert("Erro ao verificar o usuário.");
      return true;
    }
  };

  // Função de registro
  const registrarUsuario = async () => {
    if (!text_user || !text_password || !confirmPassword) {
      alert("Existem campos sem nada digitado no registro. Favor completar todos os campos!");
      return;
    }

    if (text_password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    // Verificar se o usuário já existe antes de registrar
    const usuarioExistente = await verificarUsuario();
    if (usuarioExistente) return; // Se o usuário já existe, não continua

    // Chama a rota de registrar o usuário no backend
    try {
      const response = await axios.post(`${baseURL}/registrar-usuario`, {
        username: text_user,
        password: text_password,
      });

      if (response.data.message) {
        alert("Registro bem-sucedido! Faça login."); // Alerta de sucesso
        setIsRegistering(false); // Navegar para a próxima página após o registro
      }
    } catch (error) {
      console.error("Erro ao registrar o usuário:", error);
      alert("Erro ao registrar o usuário.");
    }
  };

  // Função de login
  const loginUsuario = async () => {
    if (!text_user || !text_password || !text_key) {
      alert("Existem campos sem nada digitado no login. Favor completar todos os campos!");
      return;
    }
  
    try {
      // Verifica se o usuário e a senha estão corretos
      const authResponse = await axios.post(`${baseURL}/verificar-login`, {
        username: text_user,
        password: text_password,
      });
  
      if (!authResponse.data.success) {
        alert("Usuário ou senha incorretos!");
        return;
      }
  
      // Se as credenciais estiverem corretas, envia a chave
      const keyResponse = await axios.post(`${baseURL}/receber_chave`, {
        user: text_user,
        password: text_password,
        key: text_key,
      });
  
      if (keyResponse.data.chave) {
        console.log("Login bem-sucedido:", keyResponse.data);
        navigate("/escolha_generos");
      } else {
        alert("Erro ao validar a chave.");
      }
      
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao enviar dados.");
    }
  };
  

  // Função para alternar a visibilidade da senha
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
  const toggleKeyVisibility = () => setShowKey(!showKey);

  return (
    <div className="container_login">
      {isRegistering ? (
        <div className="container_register">
          <h2>Registre-se</h2>
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
            <p className="mt-2">Criar Senha</p>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha..."
              value={text_password}
              onChange={(e) => setTextPassword(e.target.value)}
              className="input_box"
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <div className="container_title_input">
            <p className="mt-2">Confirmar Senha</p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirme sua senha..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input_box"
            />
            <button type="button" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <button className="button_config" onClick={registrarUsuario}>
            Registrar
          </button>
          <p
            onClick={() => setIsRegistering(false)}
            className="toggle_form"
            style={{ cursor: "pointer" }}
          >
            Já tem uma conta? Faça login
          </p>
        </div>
      ) : (
        <div className="container_informations">
          <h2>Login</h2>
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
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha..."
              value={text_password}
              onChange={(e) => setTextPassword(e.target.value)}
              className="input_box"
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <div className="container_title_input">
            <p className="mt-2">Senha OPEN AI</p>
            <input
              type={showKey ? "text" : "password"}
              placeholder="Digite sua senha da API..."
              value={text_key}
              onChange={(e) => setTextKey(e.target.value)}
              className="input_box"
            />
            <button type="button" onClick={toggleKeyVisibility}>
              {showKey ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <button className="button_config" onClick={loginUsuario}>
            Enviar
          </button>
          <p
            onClick={() => setIsRegistering(true)}
            className="toggle_form"
            style={{ cursor: "pointer" }}
          >
            Não tem uma conta? Registre-se
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;
