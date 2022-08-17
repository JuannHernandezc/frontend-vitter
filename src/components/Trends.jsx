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
import { v4 as uuidv4 } from "uuid";
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
    const uid = uuidv4();
    const col = await doc(db, `${user.uid}`, `${uid}`);
    await setDoc(col, {
      trend: trends,
      date: date,
      uid: uid,
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

  const dataTrends = trends.filter((item) => item.tweet_volume !== null);
  const scores = dataTrends.map((item) => {
    return item.tweet_volume;
  });
  const labels = dataTrends.map((item) => {
    return item.name;
  });

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
          label: 'Cantidad de Tweets por tendencia',
          data: scores,
          tension: 0.3,
          backgroundColor:"rgba(75, 192, 192, 0.4)",
          borderColor: [
            'rgb(75, 192, 192)',
          ],
          borderWidth: 2
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
          <div>
            <button
              className="btn-save-trend"
              type="button"
              onClick={saveTrend}
            >
              + añadir a mis tendencias
            </button>
          </div>
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
          <div className="pop-up__graph">
            <Bar data={data} options={options} />
          </div>
          {listTrends()}
        </section>
      </main>
    </>
  );
};
