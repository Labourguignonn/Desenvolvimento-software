import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { baseURL } from "../../services/config";
import eyeIcon from "../../assets/eye-icon.svg";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Praia from "../../assets/Login_register/Cidade_de_deus.png";
import Kill_bill from "../../assets/Login_register/Kill_bill.png";
import Fogueira from "../../assets/Login_register/Fogueira.png";

function Login({isLogged, setIsLogged}) {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false});
  const [errorMessage, setErrorMessage] = useState("");
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const loginImages = [
      { imagem: Praia },
      { imagem: Kill_bill },
      { imagem: Fogueira }
    ];

    const imageLinks = loginImages;
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

  const loginUsuario = async () => {
    if (!user.username || !user.password) return setErrorMessage("Preencha todos os campos!");

    try {
        const authResponse = await axios.post(`${baseURL}/verificar-login`, {
            username: user.username,
            password: user.password
        });
        
        console.log("Resposta do backend:", authResponse.data);

        if (!authResponse.data.success) {
            return setErrorMessage(authResponse.data.message || "Usuário ou senha incorretos!");
        }
    
        // Armazenando o nome do usuário e redirecionando
        localStorage.setItem("username", user.username);
        setIsLogged(true);
        navigate("/filtros");
        
    } catch (error) {
        // Log detalhado para entender o erro
        console.error("Erro ao enviar dados:", error);  // Log do erro
        const errorMessage = error.response?.data?.error || error.message || "Erro desconhecido";
        setErrorMessage("Erro ao enviar dados: " + errorMessage);
    }
};

  const goToRegister = async () => {
    navigate("/register"); 
  }

  return (
    <div className="container_login">
      {errorMessage && <ErrorMessage message={errorMessage} onClose={handleCloseError} />}
      <div className="container_image_film">
          <img src= {randomImage}/>
      </div>
      <div className="container_informations">
        <div className="title-login">
            Login
            <p>Venha descobrir novos filmes!</p>
          </div>
          {[{ label: "Usuário", name: "username", type: "text" }, { label: "Senha", name: "password", type: showPassword.password ? "text" : "password" }].map(({ label, name, type }) => (
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
          <button className="button_config_login" onClick={loginUsuario}>
            Entre
          </button> 
          <p className="toggle_form_register" style={{ cursor: "pointer" }} onClick={goToRegister} >
            Não tem uma conta? Registre-se
          </p>
      </div>
    </div>
  );
}

export default Login;

