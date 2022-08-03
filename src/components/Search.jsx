import React from "react";
import { Navbar } from "./utils/Navbar.jsx";
import axios from "axios";
import { auth } from "../helpers/firebase.js";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import "./styles/Search.css";
import { cityData } from '../helpers/colombiaData';

export const Search = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [q, setQ] = useState("");
  const [tweet, setTweet] = useState([]);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const cleanData = (data) => {

    const removeAccents = (string) => {
      const accents = { á: "a", é: "e", í: "i", ó: "o", ú: "u" };
      return string
        .split("")
        .map((letter) => accents[letter] || letter)
        .join("")
        .toString();
    };

    const splitLocation = (string) => {
      const expReg = /[-,\s]/;
      const split = string.split(expReg)[0].toString();
      return split;
    };

    const lessData = data.map((item) => {
      const lowerLocation = item.user.location.toLowerCase();
      const removeAccentsLocation = removeAccents(lowerLocation);
      const onlyCityLocation = splitLocation(removeAccentsLocation);
      return {
        username: item.user.screen_name,
        date: item.created_at,
        text: item.text,
        location: splitLocation(item.user.location),
        locationDev: onlyCityLocation
      };
    });

    const allowCities = cityData.map((data) => {
      return data.city;
    });

    const emptyLocation = lessData.filter((item) => {
      return item.locationDev !== "" && allowCities.includes(item.locationDev);
    });
    return emptyLocation;
  };

  const getSearch = () => {
    axios
      .get("/api/search", {
        params: {
          q,
        },
      })
      .then((response) => {
        const data = cleanData(response.data.statuses);
        console.log(data);
        setTweet(data);
      });
  };

  const processData = (e) => {
    e.preventDefault();
    if (!q.trim()) {
      console.log("Esta vacio");
    }
    getSearch();
    setQ('');
  };

  const data = () => {
    return tweet.map((info, index) => {
      return (
        <div key={index} className="card">
          <h1 className="title-card">@{info.username}</h1>
          <p className="main-text-card">{info.text}</p>
          <p className="location-text-card">{info.location}</p>
          <p>{index}</p>
          {/* <p>{info.date}</p> */}
        </div>
      );
    });
  };

  return (
    <>
      <Navbar />
      <main className="main-container-search">
        <form onSubmit={processData}>
          <input
            type="text"
            placeholder="Ingrese la palabra clave a buscar"
            onChange={(e) => setQ(e.target.value)}
            value={q}
          />
          <button type="submit" className="btn-search-tweet">Buscar</button>
        </form>
        <div className="container-cards">{!tweet ? <h1>Esperando contenido</h1> : data()}</div>
      </main>
    </>
  );
};
