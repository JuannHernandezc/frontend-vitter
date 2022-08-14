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

  const sortDate = (data) => {
    const sortArray = data.sort((a,b) => {
      const dateStart =  new Date((a.date.seconds * 1000) + (a.date.nanoseconds * 0.000001));
      const dateEnd = new Date((b.date.seconds * 1000) + (b.date.nanoseconds * 0.000001));
      return dateEnd - dateStart;
    });
    return sortArray;
  }
  const getData = async (user) => {
    try {
      const data = await getDocs(collection(db, user.uid));
      const arrayData = data.docs.map((item) => item.data());
      const orderedArray = sortDate(arrayData);
      setInfo(orderedArray);
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
            <p className="text-date"> <b>Fecha: </b> {  new Date((item.date.seconds * 1000) + (item.date.nanoseconds * 0.000001)).toLocaleDateString('es-CO', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) }</p>
            <p className="text-date"> <b>Hora: </b> {  new Date((item.date.seconds * 1000) + (item.date.nanoseconds * 0.000001)).toLocaleTimeString() }</p>
            <h2>Tendencias Guardadas</h2>
            <div className="container-trend-date">{item.trend.map((tre,index) => <a href={tre.url}><p key={index}>{index + 1 } - {tre.name}</p></a>)}</div>
          </div>
        ))
      }
    </>
  );
};
