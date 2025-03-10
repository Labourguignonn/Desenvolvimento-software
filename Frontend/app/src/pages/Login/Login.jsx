import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { baseURL } from "../../services/config";
import eyeIcon from "../../assets/eye-icon.svg";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Samurai from "../../assets/Login/register_images/Samurai.png";
import Predio from "../../assets/Login/register_images/Predio.png";
import Bateria from "../../assets/Login/register_images/Bateria.png";
import Praia from "../../assets/Login/register_images/Cidade_de_deus.png";
import Kill_bill from "../../assets/Login/register_images/Kill_bill.png";
import Fogueira from "../../assets/Login/register_images/Fogueira.png";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "", key: "", confirmPassword: "" });
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false, key: false });
  const [errorMessage, setErrorMessage] = useState("");

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

  const randomIndex = Math.floor(Math.random() * 3);


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
      const { data } = await axios.post(`${baseURL}/registrar-usuario`, { username: user.username, password: user.password });
      if (data.message) setIsRegistering(false);
    } catch {
      setErrorMessage("Erro ao registrar o usuário.");
    }
  };

  const loginUsuario = async () => {
    if (!user.username || !user.password || !user.key) return setErrorMessage("Preencha todos os campos!");

    try {
      const authResponse = await axios.post(`${baseURL}/verificar-login`, { username: user.username, password: user.password });
      if (!authResponse.data.success) return setErrorMessage("Usuário ou senha incorretos!");

      const keyResponse = await axios.post(`${baseURL}/receber_chave`, user);
      keyResponse.data.chave ? navigate("/filtros") : setErrorMessage("Erro ao validar a chave.");
    } catch {
      setErrorMessage("Erro ao enviar dados.");
    }
  };

  // useEffect(() => {
  //   const imageLinks = [
  //     {imagem : Samurai, style : "f"},
  //     {imagem : Predio, style : "f"},
  //     {imagem : Bateria, style : "f"},
  //     {imagem : Praia, style : "q"},
  //     {imagem : Kill_bill, style : "q"},
  //     {imagem : Fogueira, style : "q"}
  // ];
  //   const randomIndex = Math.floor(Math.random() * imageLinks.length);
  //   const selectedImage = imageLinks[randomIndex];
  //   setRandomImage(selectedImage.url);
  //   setStyleClass({
  //     title: selectedImage.style === "f" ? "title-register_f title-login_f" : "title-register_q title-login_q",
  //     button: selectedImage.style === "f" ? "button_config_f" : "button_config_q"
  //   });
  // }, []);


  return (
    <div className="container_login">
      {errorMessage && <ErrorMessage message={errorMessage} onClose={handleCloseError} />}
      <div className="container_image_film">
          <img src= {isRegistering ? cadastroImages[randomIndex].imagem : loginImages[randomIndex].imagem}/>
      </div>
      <div className={isRegistering ? "container_register" : "container_informations"}>
        <div className={isRegistering ? "title-register" : "title-login"}>
            {isRegistering ? "Registre-se" : "Login"}
            <p>
              {isRegistering ? "Já possui uma conta?" : "Venha descobrir novos filmes!"}
            {isRegistering && (
              <span onClick={() => setIsRegistering(false)} className="toggle_form" style={{ cursor: "pointer", marginLeft: "1px" }}>
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
            {isRegistering ? "Registrar" : "Enviar"}
          </button>
          {!isRegistering && (
          <p onClick={() => setIsRegistering(!isRegistering)} className="toggle_form" style={{ cursor: "pointer" }}>
            Não tem uma conta? Registre-se
          </p>
        )}
      {/* <div className="container_image_film">
          <img src= {randomImage} alt="Imagem do "/>
      </div> */}
      </div>
    </div>
  );
}

export default Login;