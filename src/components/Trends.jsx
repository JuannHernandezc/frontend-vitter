import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../helpers/firebase.js";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
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
        console.log(response.data);
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
            </li>
          );
        })}
      </ul>
    );
  };
  const title = () => {
    const final = objectCity.filter((item) => {
      return item.woeid === woeid;
    });
    return final[0].country;
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
          <h1>Tendencias de Twitter {title()}</h1>
          {listTrends()}
        </section>
      </main>
    </>
  );
};
