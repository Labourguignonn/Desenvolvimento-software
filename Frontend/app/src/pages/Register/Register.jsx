import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import axios from "axios";
import "./Register.css";
import { baseURL } from "../../services/config";
import eyeIcon from "../../assets/eye-icon.svg";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Samurai from "../../assets/Login_register/Samurai.png";
import Predio from "../../assets/Login_register/Predio.png";
import Bateria from "../../assets/Login_register/Bateria.png";

function Register() {
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

    const imageLinks = cadastroImages;
    const randomIndex = Math.floor(Math.random() * imageLinks.length);
    const selectedImage = imageLinks[randomIndex];

    setRandomImage(selectedImage.imagem);
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleVisibility = (name) => {
    setShowPassword({ ...showPassword, [name]: !showPassword[name] });
  };
  const handleCloseError = () => setErrorMessage("");


  const goToLogin = async () => {
    navigate("/login"); 
  }

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

  return (
    <div className="container_login">
      {errorMessage && <ErrorMessage message={errorMessage} onClose={handleCloseError} />}
      <div className="container_image_film">
          <img src= {randomImage}/>
      </div>
      <div className= "container_register" >
        <div className="title-register" >
            Cadastre-se
            <p className="toggle_form_login" style={{ cursor: "pointer" }} onClick = {goToLogin}>
            Já possui uma conta? Login
          </p>
          </div>
          {[{ label: "Usuário", name: "username", type: "text" }, { label: "Senha", name: "password", type: showPassword.password ? "text" : "password" }, ...([{ label: "Confirmar Senha", name: "confirmPassword", type: showPassword.confirmPassword ? "text" : "password" }])].map(({ label, name, type }) => (
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
          <button className= "button_config_register" onClick= "registrarUsuario">
            Cadastre-se
          </button>
      </div>
    </div>
  );
}

export default Register;
