//Imports CSS
import "./styles/Register.css";

//Imports FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback } from "react";

import { db } from "../helpers/firebase.js";
import { doc, setDoc } from "firebase/firestore";

import { v4 as uuidv4 } from 'uuid';


export const Contact = () => {

  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState(null);

  const closedPopUp = () => {
    const popUp = document.getElementsByClassName('pop-up__contact');
    popUp[0].style.bottom = '125%';
  }

  const saveInformation = useCallback(async () => {
    try {
      const col = await doc(db, "comments", uuidv4());
      await setDoc(col, {
        email: email,
        comment: comment
      });
      setEmail("");
      setComment("");
      setError(null);
      closedPopUp();
    } catch (error) {
      console.log(error);
    }
  },[email, comment]);

  const processData = (e) => {
    e.preventDefault();
    if(!email.trim()){
      setError("El campo Email no puede estar vacio");
      setTimeout(() => {
        setError(null);
      }, 15000);
      window.scrollTo(0, 0);
      return;
    }
    if(!comment.trim()){
      setError("El campo Comentario no puede estar vacio");
      setTimeout(() => {
        setError(null);
      }, 15000);
      window.scrollTo(0, 0);
      return;
    }
    saveInformation();
  }
  return (
    <>
      <main className="container-main">
        <div className="container-close">
          <FontAwesomeIcon
            className="icon-close"
            icon={faClose}
            onClick={closedPopUp}
          />
        </div>
        <div className="container-icon">
          <h1>Contacto</h1>
        </div>
        {error && <p className="error">{error}</p>}
        <form className="container-form" onSubmit={processData}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <textarea 
            className="text-area" 
            placeholder="Escribe como podemos ayudarte" 
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          >
          </textarea>
          <button className="btn-contact" type="submit">
            Enviar comentario
          </button>
        </form>
      </main>
    </>
  );
};
