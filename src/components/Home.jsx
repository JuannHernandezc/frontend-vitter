import { Footer } from "./utils/Footer";
import { Navbar } from "./utils/Navbar";
import { useNavigate } from "react-router";
import { auth } from "../helpers/firebase.js";
import "./styles/Home.css";
import { useEffect, useState } from "react";
export const Home = ({ firebaseUser }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser);
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, [navigate]);
  const openPopUp = () => {
    const popUp = document.getElementsByClassName('pop-up__register');
    popUp[0].style.bottom = '0%';
  }
  return (
    <>
      <main className="main">
        <Navbar firebaseUser={firebaseUser} />
        <div className="container-sections">
          <section className="main__section animate__animated animate__fadeInTopLeft">
            <p>
              <span className="change-letter">Vitter</span> una nueva forma de
              mirar Twitter
            </p>
          </section>
          <section className="second-section">
            <p>Crear mapas de calor acerca de las tendencias de Twitter</p>
            <div className="second-section__picture">
              <img
                src="https://res.cloudinary.com/danhzm8qb/image/upload/v1653868164/vitter/mapaCalor_xsailf.jpg"
                alt="Mapa de calor"
              />
            </div>
            <button onClick={openPopUp} className="btn-create-map">Crear mapa</button>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
};
