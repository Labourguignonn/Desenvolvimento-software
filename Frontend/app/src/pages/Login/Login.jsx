import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import axios from "axios";
import "./Login.css";
import { baseURL } from "../../services/config";
import eyeIcon from "../../assets/eye-icon.svg";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Samurai from "../../assets/Login_register/Samurai.png";
import Predio from "../../assets/Login_register/Predio.png";
import Bateria from "../../assets/Login_register/Bateria.png";
import Praia from "../../assets/Login_register/Cidade_de_deus.png";
import Kill_bill from "../../assets/Login_register/Kill_bill.png";
import Fogueira from "../../assets/Login_register/Fogueira.png";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "", confirmPassword: "" });
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false});
  const [errorMessage, setErrorMessage] = useState("");
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const cadastroImages = [
      { imagem: Samurai },
      { imagem: Predio },
      { imagem: Bateria }
    ];

    const loginImages = [
      { imagem: Praia },
      { imagem: Kill_bill },
      { imagem: Fogueira }
    ];

    const imageLinks = isRegistering ? cadastroImages : loginImages;
    const randomIndex = Math.floor(Math.random() * imageLinks.length);
    const selectedImage = imageLinks[randomIndex];
    setRandomImage(selectedImage.imagem);
  }, [isRegistering]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (name) => {
    setShowPassword({ ...showPassword, [name]: !showPassword[name] });
  };
  const handleCloseError = () => setErrorMessage("");

  const verificarUsuario = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/verificar-usuario`, { params: { username: user.username } });
      if (data.usuario_existe) setErrorMessage("Este usuário já existe. Tente outro.");
      return data.usuario_existe;
    } catch {
      setErrorMessage("Erro ao verificar o usuário.");
      return true;
    }
  };

  const registrarUsuario = async () => {
    if (!user.username || !user.password || !user.confirmPassword) return setErrorMessage("Preencha todos os campos!");
    if (user.password !== user.confirmPassword) return setErrorMessage("As senhas não coincidem!");
    if (await verificarUsuario()) return;

    try {
      const { data } = await axios.post(`${baseURL}/registrar-usuario`, { username: user.username, password: user.password, });
      if (data.message) setIsRegistering(false);
    } catch {
      setErrorMessage("Erro ao registrar o usuário.");
    }
  };

  const loginUsuario = async () => {
    if (!user.username || !user.password) return setErrorMessage("Preencha todos os campos!");

    try {
      const authResponse = await axios.post(`${baseURL}/verificar-login`, { username: user.username, password: user.password });
      console.log("Resposta do backend:", authResponse.data);
      if (!authResponse.data.success) {
        return setErrorMessage(authResponse.data.message || "Usuário ou senha incorretos!");
      }
  
      if (user.username && user.password) {
        navigate("/filtros");
      } else {
        setErrorMessage("Preencha todos os campos corretamente!");
      }
    } catch (error) {
      setErrorMessage("Erro ao enviar dados: " + error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="container_login">
      {errorMessage && <ErrorMessage message={errorMessage} onClose={handleCloseError} />}
      <div className="container_image_film">
          <img src= {randomImage}/>
      </div>
      <div className={isRegistering ? "container_register" : "container_informations"}>
        <div className={isRegistering ? "title-register" : "title-login"}>
            {isRegistering ? "Cadastre-se" : "Login"}
            <p>
              {isRegistering ? "Já possui uma conta?" : "Venha descobrir novos filmes!"}
            {isRegistering && (
              <span onClick={() => setIsRegistering(false)} className="toggle_form_login" style={{ cursor: "pointer"}}>
                Login
              </span>
            )}
            </p>
          </div>
          {[{ label: "Usuário", name: "username", type: "text" }, { label: "Senha", name: "password", type: showPassword.password ? "text" : "password" }, ...(isRegistering ? [{ label: "Confirmar Senha", name: "confirmPassword", type: showPassword.confirmPassword ? "text" : "password" }] : [])].map(({ label, name, type }) => (
          <div className="container_title_input" key={name}>
            <p className="mt-2">{label}</p>
            <div className="field_with_eye">
              <input
                type={type}
                placeholder={`Digite sua ${label.toLowerCase()}...`}
                name={name}
                value={user[name]}
                onChange={handleChange}
                className="input_box"
                />
                {(name !== "username") && (
                  <button type="button" className="eye-icon" onClick={() => toggleVisibility(name)}>
                    <img src={eyeIcon} alt="Ícone de olho" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button className={isRegistering ? "button_config_register" : "button_config_login"} onClick={isRegistering ? registrarUsuario : loginUsuario}>
            {isRegistering ? "Cadastre-se" : "Entre"}
          </button>
          {!isRegistering && (
          <p onClick={() => setIsRegistering(!isRegistering)} className="toggle_form_register" style={{ cursor: "pointer" }}>
            Não tem uma conta? Registre-se
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;