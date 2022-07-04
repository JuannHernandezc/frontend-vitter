import React from "react";
import { useState, useEffect } from "react";
import { auth } from "../helpers/firebase.js";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import './styles/Trends.css';

export const Trends = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
      console.log(auth.currentUser);
    } else {
      navigate("/register");
    }
  }, [navigate]);

  const handleLocation = () => {
    alert('handle location')
  }

  const listTrends = () => {
    return <h2>Trends</h2>
  }
  return (
    <main className="main-trend">
      <section className="container-search">
        <select className="search-trending" onChange={(e) => alert(e.target.value)}>
            <option value="353201">Colombia</option>
            <option value="133481">Mexico</option>
            <option value="464678">Argentina</option>
            <option value="58060">Chile</option>
        </select>
        <FontAwesomeIcon className="icon-location" icon={faLocation} onClick={handleLocation}/>
      </section>
      <section className="container">
        {
          listTrends()
        }
      </section>
    </main>
  );
};
