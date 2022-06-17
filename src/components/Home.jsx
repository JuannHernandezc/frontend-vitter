import { Navbar } from "./utils/Navbar";
import { Footer } from "./utils/Footer";
import "./styles/Home.css";
export const Home = () => {
  return (
    <>
      <Navbar />
      <main className="main">
        <div className="container-sections">
          <section className="main__section">
            <p>
              <span className="change-letter">Vitter</span> una nueva forma de
              mirar Twitter
            </p>
          </section>
          <section className="second-section">
            <p>Crear mapas de calor acerca de las tendencias de Twitter</p>
            <div className="second-section__picture">
              <img src="https://res.cloudinary.com/danhzm8qb/image/upload/v1653868164/vitter/mapaCalor_xsailf.jpg" alt="Mapa de calor" />
            </div>
            <button className="btn-create-map">Crear mapa</button>
          </section>
        </div>
      </main>
      <Footer />
      
    </>
  );
};
