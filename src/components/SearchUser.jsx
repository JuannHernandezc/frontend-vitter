import React from "react";
import axios from "axios";
import { Navbar } from "./utils/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { auth } from "../helpers/firebase.js";
import "./styles/Search.css";

export const SearchUser = () => {
  const [screen_name, setScreen_name] = useState("");
  const [userTweet, setUserTweet] = useState({});
  const [lastTweets, setLastTweets] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

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
      .get("https://vitter-app-backend.herokuapp.com/api/user", {
        params: {
          screen_name,
        },
      })
      .then((response) => {
        setUserTweet(response.data);
      })
      .catch((error) => {
        setError("Ingrese un Usuario que se encuentre registrado en Twitter");
      });
  };

  const getSearchTweetsUser = () => {
    axios
      .get("https://vitter-app-backend.herokuapp.com/api/user-tweets", {
        params: {
          screen_name,
        },
      })
      .then((response) => {
        setLastTweets(response.data);
      })
      .catch((error) => {
        setError(
          "Ingrese un usuario valido o revise como se encuentra escrito. "
        );
        setTimeout(() => {
          setError(null);
        }, 5000);
        window.scrollTo(0, 0);
      });
  };

  const processData = (e) => {
    e.preventDefault();
    if (!screen_name.trim()) {
      setError("El campo de busqueda no puede estar vacio");
      setTimeout(() => {
        setError(null);
      }, 5000);
      window.scrollTo(0, 0);
      return;
    }
    getSearch();
    getSearchTweetsUser();
  };

  return (
    <>
      <Navbar />
      <main className="main-container-search">
        {error && <p className="error">{error}</p>}
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
                <div className="card-user">
                  <div className="left">
                    <h1>@{userTweet.screen_name}</h1>
                    <img
                      src={userTweet.profile_image_url.replace("_normal", "")}
                      alt="Profile User"
                      width="200"
                      height="200"
                    />
                  </div>
                  <div className="right">
                    <p>
                      <span>Seguidores: </span>
                      {userTweet.followers_count}
                    </p>
                    <p>
                      <span>Seguidos: </span>
                      {userTweet.friends_count}
                    </p>
                    <p>
                      <span>Creación: </span>
                      {new Date(userTweet.created_at).toLocaleDateString(
                        "es-CO",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>
                <div className="container-cards">
                  {lastTweets.map((item, index) => {
                    return (
                      <div key={index} className="card">
                        <h1 className="title-card">@{userTweet.screen_name}</h1>
                        <p className="main-text-card">{item.text}</p>
                        <p className="second-text-card">
                          {new Date(item.created_at).toLocaleDateString(
                            "es-CO",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
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
