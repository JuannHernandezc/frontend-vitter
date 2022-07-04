//Imports CSS
import "./styles/Register.css";

//Imports FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faClose } from "@fortawesome/free-solid-svg-icons";

//Imports React Router DOM
import { NavLink, useNavigate } from "react-router-dom";

//Imports React js
import { useState, useCallback } from "react";

//Imports Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../helpers/firebase.js";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = useCallback(async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setError(null);
      navigate("/admin");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Ingrese un Email valido");
      }
      if (error.code === "auth/user-not-found") {
        setError("Email NO registrado");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
    }
  }, [email, password, navigate]);

  const processData = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("El campo Email no puede estar vacio");
      setTimeout(() => {
        setError(null);
      }, 15000);
      window.scrollTo(0, 0);
      return;
    }
    if (!password.trim()) {
      setError("El campo Contraseña no puede estar vacio");
      setTimeout(() => {
        setError(null);
      }, 15000);
      window.scrollTo(0, 0);
      return;
    }
    login();
  };
  const closedPopUp = () => {
    const popUp = document.getElementsByClassName('pop-up__login');
    popUp[0].style.bottom = '125%';
  }
  return (
    <>
      <main className="container-login">
        <div className="container-close">
          <FontAwesomeIcon
            className="icon-close"
            icon={faClose}
            onClick={closedPopUp}
          />
        </div>
        <div className="container-icon">
          <FontAwesomeIcon className="icon" icon={faArrowRightToBracket} />
          <h1>Iniciar Sesión</h1>
        </div>
        {error && <p className="error">{error}</p>}
        <form className="container-form" onSubmit={processData}>
          <input
            type="email"
            placeholder="Correo"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <NavLink className="form-item" to="/rememberPassword">
            ¿Olvidaste tu contraseña?
          </NavLink>
          <button className="btn-login">Iniciar Sesión</button>
        </form>
      </main>
    </>
  );
};
