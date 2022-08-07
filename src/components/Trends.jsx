import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../helpers/firebase.js";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faCheck } from "@fortawesome/free-solid-svg-icons";
import CopyToClipboard from "react-copy-to-clipboard";
import "./styles/Trends.css";
import axios from "axios";
import { Navbar } from "./utils/Navbar.jsx";

export const Trends = () => {
  const objectCity = [
    {
      country: "Colombia",
      woeid: "23424787",
    },
    {
      country: "Mundial",
      woeid: "1",
    },
    {
      country: "Chile",
      woeid: "23424782",
    },
    {
      country: "Ecuador",
      woeid: "23424801",
    },
    {
      country: "Argentina",
      woeid: "23424747",
    },
  ];
  const [user, setUser] = useState(null);
  const [trends, setTrends] = useState([]);
  const [woeid, setWoeid] = useState("23424787");
  const [country, setCountry] = useState('');
  const [stateIcon, setStateIcon] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
    } else {
      navigate("/");
    }
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
                  const element = document.getElementsByClassName("second-text");
                  element[0].style.display = "flex";
                  setStateIcon(true);
                  window.scrollTo(0,0);
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
  const title = () => {

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
          <h1>Tendencias de Twitter {country}</h1>
          <div>
            <p className="second-text">
              <FontAwesomeIcon className="icon-check" icon={faCheck} />
              {stateIcon ? "Tendencia Copiada" : ""}
            </p>
          </div>
          {listTrends()}
        </section>
      </main>
    </>
  );
};
