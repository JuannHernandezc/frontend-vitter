import React from "react";
import axios from "axios";
import { Navbar } from "./utils/Navbar";
import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import "./styles/Search.css";
import { Bar } from "react-chartjs-2";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { auth } from "../helpers/firebase.js";

export const SearchUser = () => {
  const [screen_name, setScreen_name] = useState("");
  const [userTweet, setUserTweet] = useState({});
  const [lastTweets, setLastTweets] = useState([]);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
    } else {
      navigate("/");
    }
  }, [navigate]);

  const getSearch = () => {
    axios
      .get("/api/user", {
        params: {
          screen_name,
        },
      })
      .then((response) => {
        setUserTweet(response.data);
      });
  };

  const getSearchTweetsUser = () => {
    axios
      .get("/api/user-tweets", {
        params: {
          screen_name,
        },
      })
      .then((response) => {
        setLastTweets(response.data);
        // console.log(response.data);
      });
  };

  const processData = (e) => {
    e.preventDefault();
    if (!screen_name.trim()) {
      return console.log("Esta Vacio");
    }
    getSearch();
    getSearchTweetsUser();
  };

  const scores = [userTweet.followers_count];
  const labels = ["Seguidores"];
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  const data = useMemo(() => {
    return {
      datasets: [
        {
          label: "Cantidad",
          data: scores,
          tension: 0.3,
          borderColor: "rgb(75,192,192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
          width: 200,
        },
      ],
      labels,
    };
  }, [scores, labels]);

  const options = {
    responsive: true,
    fill: true,
  };

  return (
    <>
      <Navbar />
      <main className="main-container-search">
        <form onSubmit={processData}>
          <input
            type="text"
            placeholder="Ingrese el nombre de twitter del usuario sin el @"
            onChange={(e) => setScreen_name(e.target.value)}
            value={screen_name}
          />
          <button type="submit" className="btn-search-tweet">
            Buscar
          </button>
        </form>
        <div className="container-cards">
          {lastTweets.length !== 0 ? (
            <>
              <div className="container-searchUser">
                <h1>@{userTweet.screen_name}</h1>
                <div className="container-graph">
                  <div className="graph">
                    <Bar data={data} options={options}/>
                  </div>
                </div>
                <div className="container-cards">
                  {lastTweets.map((item, index) => {
                    return (
                      <div key={index} className="card">
                        <h1 className="title-card">@{userTweet.screen_name}</h1>
                        <p  className="main-text-card">
                          {item.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="loading">
              <h1>
                Recuerde Ingresar el nombre del usuario tal como se muestra en
                Twitter
              </h1>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
