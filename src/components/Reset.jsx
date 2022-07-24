import React from 'react';
import "./styles/Register.css";

//Imports FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faClose } from "@fortawesome/free-solid-svg-icons";

//Imports React js
import { useState } from "react";

import { auth } from "../helpers/firebase.js";
import { sendPasswordResetEmail } from "@firebase/auth";
import { useCallback } from 'react';

export const Reset = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const resetPassword = useCallback( async () => {
      try {
        await sendPasswordResetEmail(auth,email);
        console.log("Correo Enviado")
      } catch (error) {
          setError(error.message);
      }
    },[email]) 
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
      resetPassword();
    };
    const closedPopUp = () => {
      const popUp = document.getElementsByClassName('pop-up__reset');
      popUp[0].style.bottom = '125%';
    }
  return (
    <main className="container-login">
    <div className="container-close">
      <FontAwesomeIcon
        className="icon-close"
        icon={faClose}
        onClick={closedPopUp}
      />
    </div>
    <div className="container-icon">
      <FontAwesomeIcon className="icon" icon={faKey} />
      <h1>Recuperar Contraseña</h1>
    </div>
    {error && <p className="error">{error}</p>}
    <form className="container-form" onSubmit={processData}>
      <input
        type="email"
        placeholder="Correo"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <button className="btn-reset">Recuperar Constraseña</button>
    </form>
  </main>
  )
}
