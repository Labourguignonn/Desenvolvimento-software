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

  // useEffect(() => {
  //   const imageLinks = [
  //     "https://s3-alpha-sig.figma.com/img/2dba/2222/b8cd9c8690b977c6e85f9864ab7bd99b?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KG1OwLbWFqaianfiCZuQ0fIApzDnrcUqnm~xwcf0F0EoSG8MCswfBxH1whsgNsX0oUaAzfcPIHsuExgKjyDrZQxWrXqFt1OdK~c6oM-bBNrRsi4NHCvxCZq6Aq8GFvNLc6l3S-wA6C56i8U3RdbBrE3Nh9zC0jBCcvbvVDeK74EO0fdyFh591hpbO~pGoQzh7PRvn-yHFxSg6SUdMq5OSYQd-ORTQTdlx0NsHunWDyu0V-seTw9A3rznKqZlTr4bHzV74YJ7xFteH341vPHBLfuF4BDQSGuulIkxiznAmgvyYU5NJeE1tcg4LSm6TVTGIGhQfCpJJDYDQMG8YDlEvg__",
  //     "https://s3-alpha-sig.figma.com/img/da0f/b515/060d490021c0ccb31d7264ca45708a2a?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=F-M9LeO9rcVk4~8ZELY6J3Q787HLbbTSSNQniRKm6tK~5HAr0v-n3q9FgrIzBPOhdmBECaswy409T2QdV1ue~9oWjBEfhgu9-GNh3x0vQiYyqTqHHVATuLgcsJKVSOSAkej8NMQ~wZ~PrD4PDZxvwbL7EWOco9AZ4MbOuDcEbGOIsktOXBQrrQI1R3ZX80YyskWANVxcBoD5v4UBTHpmPKEyZTdlV9qU4~9SagWIgG45qq~nmpQqQ9CZdskqYfVV3yae8Z42rHtvbz6XwE~ppCq80qJNJOqRrFSvaKZqzM4Rk40iPdq0FfezK~SnpzsovdQr8zvnYQ9SscNr9cxZhA__",
  //     "https://s3-alpha-sig.figma.com/img/6bcc/34f6/18f1b078806b83fa79ec1141bcdb2b3d?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=duWbCrkFCEQMV0z6tbYqs1ClrUIgivx0PS8bVURKxIQMnUmMn-yQE3QGT~juUOTntHfYOhkLcPnKxvKi4b5tcx0Cb7EbtQf-RAiat6-IBsGY8dZF9doGWrhS483cCvcq9WivbwYJ1QEecpfAGMU305pRFRZzPH22ommurEpj2eFPUjshTxOzwbOGZdxtE1apLdAdiO8L33UwplXfWddF8eZxesW0DutBTvDIrdtjmF~c7hk-RiLsbPwa0NtygXiFdbqutRfVPYfxLXkuRgzfw0yit1zF3CeYnq6XUmiWDBX198hVKVi4bDXLWlBFblti77xoftaSG8p~br3AS3vFjA__",
  //     "https://s3-alpha-sig.figma.com/img/eb44/4506/567a92e5be2e77e5f1d90d532bf1711b?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SBYfRLBbuos65DySzPpGTyjhsmJfW02SNAEcBCch3BvZspp56tnFacMAGm4y2Mc04aTf1J~2c5fUqLL~TdH6Az4rN1rhengRdkEk~FUO7l7MTGZSEVnNjbRuwASQ6NCu2XIDDgnLXQUU3Bi6fyO6c6LnX~VelGldnrKBFPrFI4KEFnfEX4d-sgK9nITKzJ~MbkudjEXvM-JvgWPyNbOT4x8-1e0rAYFIfKws7vh~MDKZkfdqrTj8L7uixUPSfA9bUfPdfQChNd7rXZ5uWXxkBTlvJIXNRO7MUpu-PUO3Z1bWn36TaLsxJt1Z71H4QeaDbWE0vlrfSMUaqVpgJRWorQ__",
  //     "https://s3-alpha-sig.figma.com/img/0198/6f13/e5aa64156cb09f4d1ad8ba11bf7b7d27?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UA1FYCPaoXwFyweWcEdx4mdtcnxtokKkM4~zvdvE0KUtZghsfnyr9eGDANWlZ~ddE65DCe9kKmklyOxk4LFn9HxSb49CByvru2TQL-1EosnxFgM6HgyBTPGKF4VxstNAc7ZqyIT2KYXX4oWUPmnRMX6z-Y~POL4ZlioWn5AXilVybLNqGQJA2u-sJXQjqeb2EKhG-UVoqYBILR-sutXhnvRPpdt8Su4cEb167eX87aKMhUyu~RaUyWWCTr0EvucyBOLgnoNiDKxq~M3QJITwuGbjd8pIoZqOc3ueH53QAQFmJ5pHN7YoJK24GZ0TI7XOUX6MP54c--8GyGZ0Yt76Gw__",
  //     "https://s3-alpha-sig.figma.com/img/277d/8a7b/e8813f8081db870b7e462cd9a9986017?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UTvj3KfJZ51XyQA4bifXMWCKLb6k1q7SAtHDXfi2xB405dkNTI8Q1DcRC~C2yHfn3g7FMJQC-VgoVKBZzV7GxrmeCsSbqnJz5uW~cftD0YQzp~w9fIKMYddaoQPgmdyQo2h9rdovpVF8oFKKaIgOIcc83V4yYSXG5hn6iAm5cZy-2l~63Pyzhjdu42NRzWjcif3c7KAnj~f3ZD3mljxQNmxQLEG4cp7G3sZ5Bf9lNKglgET~iqPFih5wnIOqbJEDhvU4aejZipCQ5ZmFy~tOdxMQDROQ1sR~pckSXpcS08BdLXRT4HjQy4gKZsTXUxVI~49RHTQ~rXyx-WVmw4d4Aw__"
  //   ];
  //   const randomIndex = Math.floor(Math.random() * imageLinks.length);
  //   setRandomImage(imageLinks[randomIndex]);
  // }, []);


  return (
    <div className="container_login">
      {errorMessage && <ErrorMessage message={errorMessage} onClose={handleCloseError} />}
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
          {!isRegistering && (
          <p onClick={() => setIsRegistering(!isRegistering)} className="toggle_form" style={{ cursor: "pointer" }}>
            Não tem uma conta? Registre-se
          </p>
        )}
      </div>
      <div className="container_image_film">
          <img src= "https://s3-alpha-sig.figma.com/img/da0f/b515/060d490021c0ccb31d7264ca45708a2a?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=F-M9LeO9rcVk4~8ZELY6J3Q787HLbbTSSNQniRKm6tK~5HAr0v-n3q9FgrIzBPOhdmBECaswy409T2QdV1ue~9oWjBEfhgu9-GNh3x0vQiYyqTqHHVATuLgcsJKVSOSAkej8NMQ~wZ~PrD4PDZxvwbL7EWOco9AZ4MbOuDcEbGOIsktOXBQrrQI1R3ZX80YyskWANVxcBoD5v4UBTHpmPKEyZTdlV9qU4~9SagWIgG45qq~nmpQqQ9CZdskqYfVV3yae8Z42rHtvbz6XwE~ppCq80qJNJOqRrFSvaKZqzM4Rk40iPdq0FfezK~SnpzsovdQr8zvnYQ9SscNr9cxZhA__"/>
      </div>
    </div>
  );
}

export default Login;