import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { auth } from "../helpers/firebase.js";
import { useNavigate } from "react-router";
import { Navbar } from "./utils/Navbar.jsx";
import { db } from "../helpers/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./styles/Admin.css";

export const Admin = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const getData = async (id) => {
    const docReference = doc(db, "users", id);
    const docSnap = await getDoc(docReference);
    setUser(docSnap.data());
    console.log(docSnap.data());
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getData(user.uid);
      } else {
        navigate("/");
      }
    });
  }, [navigate]);
  return (
    <>
      <Navbar />
      <main className="container-admin">
        <div className="container-text">
          <p className="title-admin">
            ¡ Bienvenido {user.name} {user.lastName} !
          </p>
          <p className="second">Recuerda que con Vitter puedes analizar tendencias - crear mapas de calor y ver estadisticas de los mas grandiosos temas de Twitter</p>
        </div>
      </main>
    </>
  );
};
