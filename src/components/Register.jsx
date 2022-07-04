//Imports CSS
import "./styles/Register.css";

//Imports Components React

//Imports React
import { useState, useCallback } from "react";

//Imports FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClose } from "@fortawesome/free-solid-svg-icons";

//Imports React Router DOM
import { NavLink, useNavigate } from "react-router-dom";

//Imports Firebase
import { auth, db } from "../helpers/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const Register = () => {
  // Const Declarations

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //Function that allow register firebase

  const register = useCallback(async () => {
    try {
      const answer = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const col = await doc(db, "users", answer.user.uid);
      await setDoc(col, {
        uid: answer.user.uid,
        email: answer.user.email,
        name: name,
        lastName: lastName,
        phone: phone,
        type: "client",
      });
      setEmail("");
      setName("");
      setLastName("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");
      setError(null);
      navigate("/admin");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Ingrese un Email valido");
      }
      if (error.code === "auth/email-already-in-use") {
        setError(
          "Este email ya se encuentra en uso, verifique si ya tiene una cuenta o cambielo"
        );
      }
    }
  }, [email, password, lastName, name, phone, navigate]);

  const processData = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("El campo Nombre no puede estar vacio");
      setTimeout(() => {
        setError(null);
      }, 15000);
      window.scrollTo(0, 0);
      return;
    }
    if (!lastName.trim()) {
      setError("El campo Apellido no puede estar vacio");
      setTimeout(() => {
        setError(null);
      }, 15000);
      window.scrollTo(0, 0);
      return;
    }
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
    if (!confirmPassword.trim()) {
      setError("El campo Confirmar Contraseña no puede estar vacio");
      setTimeout(() => {
        setError(null);
      }, 15000);
      window.scrollTo(0, 0);
      return;
    }
    if(password.trim() !== confirmPassword.trim()){
      setError("El campo contraseña y confirmar contraseña no son iguales");
      setTimeout(() => {
        setError(null);
      }, 15000)
      window.scrollTo(0, 0);
      return;
    }
    if (!phone.trim()) {
      setError("El campo Numero Celular no puede estar vacio");
      setTimeout(() => {
        setError(null);
      }, 15000);
      window.scrollTo(0, 0);
      return;
    }
    register();
  };
  const closedPopUp = () => {
    const popUp = document.getElementsByClassName('pop-up__register');
    popUp[0].style.bottom = '125%';
  }
  return (
    <>
      <main className="container-main">
        <div className="container-close">
          <FontAwesomeIcon className="icon-close" icon={faClose} onClick={closedPopUp} />
        </div>
        <div className="container-icon">
          <h1>REGISTRO</h1>
        </div>
        {error && <p className="error">{error}</p>}
        <form className="container-form" onSubmit={processData}>
          <input
            type="text"
            placeholder="Nombre"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            placeholder="Apellidos"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
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
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <input
            type="number"
            placeholder="Numero Celular"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <NavLink className="form-item" to="/terms">
            Terminos y condiciones
          </NavLink>
          <button className="btn-register" type="submit">
            Registrarse
          </button>
        </form>
      </main>
    </>
  );
};
