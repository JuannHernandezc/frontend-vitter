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
  const [user, setUser] = useState(null);
  const [trends, setTrends] = useState([]);
  const [woeid, setWoeid] = useState("1");
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
        // console.log(response.data);
        setTrends(response.data[0].trends);
      })
      .catch((error) => console.log(error.message));
  };
  const handleLocation = () => {
    alert("handle location");
  };

  const listTrends = () => {
    return (
      <ul>
        {trends.map((trend, index) => {
          return (
            <li key={index}>
              <a href={trend.url}>{trend.name}</a>
              {trend.tweet_volume && <span>{trend.tweet_volume}</span>}
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
            <option value="1">Worldwide</option>
            <option value="23424787">Colombia</option>
            <option value="23424848">India</option>
            <option value="2459115">New York,US</option>
            <option value="2442047">Los Angeles,US</option>
            <option value="2295411">Mumbai</option>
            <option value="1105779">Sydney,AU</option>
          </select>
          <FontAwesomeIcon
            className="icon-location"
            icon={faLocation}
            onClick={handleLocation}
          />
        </section>
        <section className="container">{listTrends()}</section>
      </main>
    </>
  );
};
