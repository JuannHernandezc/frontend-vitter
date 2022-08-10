import React from "react";
import { useState, useEffect } from "react";
import { auth, db } from "../helpers/firebase.js";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faCheck } from "@fortawesome/free-solid-svg-icons";
import CopyToClipboard from "react-copy-to-clipboard";
import "./styles/Trends.css";
import axios from "axios";
import { Navbar } from "./utils/Navbar.jsx";
import { doc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const Trends = () => {
  const [user, setUser] = useState(null);
  const [trends, setTrends] = useState([]);
  const [woeid, setWoeid] = useState("23424787");
  const [country, setCountry] = useState("");
  const [stateIcon, setStateIcon] = useState(false);
  const [stateBtn, setStateBtn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/");
      }
    });
    getTrends();
  }, [navigate, woeid]);

  const getTrends = () => {
    axios
      .get("/api/trends", {
        params: {
          woeid,
        },
      })
      .then((response) => {
        setCountry(response.data[0].locations[0].name);
        setTrends(response.data[0].trends);
      })
      .catch((error) => console.log(error.message));
  };
  const saveTrend = async () => {
    const date = new Date();
    const finalDate = `${date.toLocaleDateString(
      "es-co"
    )}-${date.toLocaleTimeString("es")}`;
    const col = await doc(db, `${user.uid}`, `${finalDate.replaceAll('/','-')}`);
    await setDoc(col, {
      trend: trends,
      date: finalDate.replaceAll('/','-')
    });
    const element = document.getElementsByClassName("second-text-btn");
    element[0].style.display = "flex";
    setStateBtn(true);
    window.scrollTo(0, 0);
    setTimeout(() => {
      setStateBtn(false);
      element[0].style.display = "none";
    }, 2000);

  };
  const listTrends = () => {
    return (
      <ul className="trend-list">
        {trends.map((trend, index) => {
          return (
            <li key={index} className="item-list-trend">
              <a className="item-list-link" href={trend.url}>
                {index + 1} - {trend.name}
              </a>
              <span className="other-text">
                {trend.tweet_volume === null
                  ? "N/A"
                  : ` Cantidad: ${trend.tweet_volume} tweets`}
              </span>
              <CopyToClipboard
                text={trend.name}
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
    );
  };
  return (
    <>
      <Navbar />
      <main className="main-trend">
        <section className="container-search">
          <select
            className="search-trending"
            onChange={(e) => setWoeid(e.target.value)}
          >
            <option value="23424787">Colombia</option>
            <option value="1">Mundial</option>
            <option value="23424782">Chile</option>
            <option value="23424801">Ecuador</option>
            <option value="23424747">Argentina</option>
          </select>
        </section>
        <section className="container">
          <button className="btn-save-trend" type="button" onClick={saveTrend}>
            + añadir a mis tendencias
          </button>
          <h1>Tendencias de Twitter {country}</h1>
          <div>
            <p className="second-text">
              <FontAwesomeIcon className="icon-check" icon={faCheck} />
              {stateIcon ? "Tendencia Copiada" : ""}
            </p>
            <p className="second-text-btn">
              <FontAwesomeIcon className="icon-check" icon={faCheck} />
              {stateBtn ? "Tendencia Agregada" : ""}
            </p>
          </div>
          {listTrends()}
        </section>
      </main>
    </>
  );
};
