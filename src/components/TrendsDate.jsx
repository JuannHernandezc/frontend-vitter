import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { db } from "../helpers/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { Navbar } from "./utils/Navbar";
import { auth } from "../helpers/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './styles/TrendsDate.css';
export const TrendsDate = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [info, setInfo] = useState([]);

  const getData = async (user) => {
    try {
      const data = await getDocs(collection(db, user.uid));
      const arrayData = data.docs.map((item) => item.data());
      setInfo(arrayData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user);
        getData(user);
      } else {
        navigate("/");
      }
    });
  }, [navigate, username]);
  return (
    <>
      <Navbar />
      {
        info.map((item,index) => (
          <div key={index} className="container-trends-date">
            <p className="text-date"> <b>Fecha y hora de guardado:</b> {item.date}</p>
            <h2>Tendencias Guardadas</h2>
            <div className="container-trend-date">{item.trend.map((tre,index) => <p key={index}>{index + 1 } - {tre.name}</p>)}</div>
          </div>
        ))
      }
    </>
  );
};
