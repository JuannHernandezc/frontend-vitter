import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { db } from "../helpers/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { Navbar } from "./utils/Navbar";
import { auth } from "../helpers/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faCheck } from "@fortawesome/free-solid-svg-icons";
import CopyToClipboard from "react-copy-to-clipboard";
import "./styles/TrendsDate.css";
import "./styles/Trends.css";
export const TrendsDate = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [info, setInfo] = useState([]);
  const [stateIcon, setStateIcon] = useState(false);

  const sortDate = (data) => {
    const sortArray = data.sort((a, b) => {
      const dateStart = new Date(
        a.date.seconds * 1000 + a.date.nanoseconds * 0.000001
      );
      const dateEnd = new Date(
        b.date.seconds * 1000 + b.date.nanoseconds * 0.000001
      );
      return dateEnd - dateStart;
    });
    return sortArray;
  };
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
      <p className="second-text">
        <FontAwesomeIcon className="icon-check" icon={faCheck} />
        {stateIcon ? "Tendencia Copiada" : ""}
      </p>
      {info.map((item, index) => (
        <div key={index} className="container-trends-date">
          <p className="text-date">
            {" "}
            <b>Fecha: </b>{" "}
            {new Date(
              item.date.seconds * 1000 + item.date.nanoseconds * 0.000001
            ).toLocaleDateString("es-CO", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-date">
            {" "}
            <b>Hora: </b>{" "}
            {new Date(
              item.date.seconds * 1000 + item.date.nanoseconds * 0.000001
            ).toLocaleTimeString()}
          </p>

          <h2>Tendencias Guardadas</h2>
          <ul className="trend-list">
            {item.trend.map((tre, index) => {
              return (
                <li key={index} className="item-list-trend">
                  <a className="item-list-link" href={tre.url}>
                    {index + 1} - {tre.name}
                  </a>
                  <span className="other-text">
                    {tre.tweet_volume === null
                      ? "N/A"
                      : ` Cantidad: ${tre.tweet_volume} tweets`}
                  </span>
                  <CopyToClipboard
                    text={tre.name}
                    onCopy={() => {
                      const element =
                        document.getElementsByClassName("second-text");
                      element[0].style.display = "flex";
                      setStateIcon(true);
                      window.scrollTo(0, 0);
                      setTimeout(() => {
                        setStateIcon(false);
                        element[0].style.display = "none";
                      }, 2000);
                    }}
                  >
                    <FontAwesomeIcon className="icon-copy" icon={faClipboard} />
                  </CopyToClipboard>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
};
