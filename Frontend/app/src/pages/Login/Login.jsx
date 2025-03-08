import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { baseURL } from "../../services/config";
import eyeIcon from "../../assets/eye-icon.svg";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "", key: "", confirmPassword: "" });
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false, key: false });
  const [errorMessage, setErrorMessage] = useState("");

  const toggleVisibility = (field) => setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
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

  return (
    <div className="container_login">
      {errorMessage && <ErrorMessage message={errorMessage} onClose={handleCloseError} />}
      <div className={isRegistering ? "container_register" : "container_informations"}>
        <div className={isRegistering ? "title-register" : "title-login"}>
            {isRegistering ? "Registre-se" : "Login"}
            <p>{isRegistering ? "Já possui uma conta?" : "Venha descobrir novos filmes!"}</p>
          </div>
          {[{ label: "Usuário", name: "username" }, { label: "Senha", name: "password" }, ...(isRegistering ? [{ label: "Confirmar Senha", name: "confirmPassword" }] : [])].map(({ label, name }) => (
            <div className="container_title_input" key={name}>
              <p className="mt-2">{label}</p>
              <div className="field_with_eye">
                <input
                  type={showPassword[name] ? "text" : "password"}
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
          <button className="button_config" onClick={isRegistering ? registrarUsuario : loginUsuario}>
            {isRegistering ? "Registrar" : "Enviar"}
          </button>
          <p onClick={() => setIsRegistering(!isRegistering)} className="toggle_form" style={{ cursor: "pointer" }}>
            {isRegistering ? "Já tem uma conta? Faça login" : "Não tem uma conta? Registre-se"}
          </p>
      </div>
      <div className="container_image_film">
          {/* <img src= "https://s3-alpha-sig.figma.com/img/0198/6f13/e5aa64156cb09f4d1ad8ba11bf7b7d27?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UA1FYCPaoXwFyweWcEdx4mdtcnxtokKkM4~zvdvE0KUtZghsfnyr9eGDANWlZ~ddE65DCe9kKmklyOxk4LFn9HxSb49CByvru2TQL-1EosnxFgM6HgyBTPGKF4VxstNAc7ZqyIT2KYXX4oWUPmnRMX6z-Y~POL4ZlioWn5AXilVybLNqGQJA2u-sJXQjqeb2EKhG-UVoqYBILR-sutXhnvRPpdt8Su4cEb167eX87aKMhUyu~RaUyWWCTr0EvucyBOLgnoNiDKxq~M3QJITwuGbjd8pIoZqOc3ueH53QAQFmJ5pHN7YoJK24GZ0TI7XOUX6MP54c--8GyGZ0Yt76Gw__"/>  */}
      </div>
    </div>
  );
}

export default Login;