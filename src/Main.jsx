//Imports React js
import { useState, useEffect } from "react";
//Imports Vitter

//Imports React Router DOM
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

//Imports Components
import { Home } from "./components/Home";
import { Contact } from "./components/Contact";
import { Admin } from "./components/Admin";

//Imports Firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./helpers/firebase.js";

//Imports Components
// import { Navbar } from "./components/utils/Navbar"
import { TermsAndConditions } from "./components/TermsAndConditions";
import { Trends } from "./components/Trends";
import { Search } from "./components/Search";
import { HeatMap } from "./components/HeatMap";

export const Main = () => {
  const [firebaseUser, setFirebaseUser] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);
  return firebaseUser !== false ? (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home firebaseUser={firebaseUser} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/search" element={<Search />} />
        <Route path="/heatmap" element={<HeatMap />}></Route>
      </Routes>
    </BrowserRouter>
  ) : (
    <p>Cargando Información</p>
  );
};
