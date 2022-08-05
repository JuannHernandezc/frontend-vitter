//Imports React Router DOM
import { NavLink, useNavigate } from "react-router-dom";

//Imports FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

//Imports Styles
import "../styles/Nav.css";
import { useState } from "react";


//Imports Firebase
import { auth } from "../../helpers/firebase";
import { signOut } from "@firebase/auth";

//Import components
import { Register } from "../Register";
import { Login } from "../Login";
import { Contact } from "../Contact";
import { Reset } from "../Reset";


export const Navbar = ({ firebaseUser }) => {
  const [responsive, setResponsive] = useState(false);
  const navigate = useNavigate();

  //Function that allow it had to responsive menu

  const handleResponsive = () => {
    setResponsive(!responsive);
  };

  //Function that allow Logout

  const signOff = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  const openPopUp = () => {
    const popUp = document.getElementsByClassName('pop-up__register');
    popUp[0].style.bottom = '0%';
  }

  const openPopUpLogin = () => {
    const popUp = document.getElementsByClassName('pop-up__login');
    popUp[0].style.bottom = '0%';
  }

  const openPopUpContact = () => {
    const popUp = document.getElementsByClassName('pop-up__contact');
    popUp[0].style.bottom = '0%';
  }
  return (
    <header className="header">
      <div className="container-responsive">
        <FontAwesomeIcon
          className="iconBar"
          icon={faBars}
          onClick={handleResponsive}
        />
      </div>
      {responsive && (
        <nav className="nav">
          <div className="container-logo">
            <NavLink to="/">
              <img
                src="https://res.cloudinary.com/danhzm8qb/image/upload/v1652191031/vitter/logotexto_reduced_min_noptc4.png"
                alt="Logo Vitter"
                onClick={handleResponsive}
              />
            </NavLink>
          </div>
          <ul>
            {firebaseUser === null ? (
              <>
                <li>
                  <NavLink
                    className="item-menu home"
                    to="/"
                    onClick={handleResponsive}
                  >
                    Inicio
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="item-menu"
                    to="/"
                    onClick={() => {
                      handleResponsive();
                      openPopUp();
                    }}
                  >
                    Registro
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="item-menu"
                    to="/"
                    onClick={() => {
                      handleResponsive();
                      openPopUpLogin();
                    }}
                  >
                    Iniciar Sesión
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="item-menu"
                    to="/"
                    onClick={() => {
                      handleResponsive();
                      openPopUpContact();
                    }}
                  >
                    Contacto
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink className="item-menu" to="/search">
                    Busqueda Tweets
                  </NavLink>
                </li>
                <li>
                  <NavLink className="item-menu" to="/trends">
                    Tendencias
                  </NavLink>
                </li>
                <li>
                  <NavLink className="item-menu" to="/trends-date">
                    Tendencias por fecha
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="item-menu"
                    to="/contact"
                    onClick={signOff}
                  >
                    Cerrar Sesión
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
      <nav className="nav-normal">
        <div className="container-logo-normal">
          <NavLink to="/">
            <img
              src="https://res.cloudinary.com/danhzm8qb/image/upload/v1652191031/vitter/logotexto_reduced_min_noptc4.png"
              alt="Logo Vitter"
            />
          </NavLink>
        </div>
        <div className="container-items">
          <ul>
            {firebaseUser === null ? (
              <>
                <li>
                  <NavLink className="item-menu-normal" to="/">
                    Inicio
                  </NavLink>
                </li>
                <li onClick={openPopUp}>
                  <NavLink  className="item-menu-normal" to="/">
                    Registro
                  </NavLink>
                </li>
                <li onClick={openPopUpLogin}>
                  <NavLink className="item-menu-normal" to="/">
                    Iniciar Sesión
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={openPopUpContact} className="item-menu-normal" to="/">
                    Contacto
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink className="item-menu-normal" to="/search">
                    Busqueda Tweets
                  </NavLink>
                </li>
                <li>
                  <NavLink className="item-menu-normal" to="/trends">
                    Tendencias
                  </NavLink>
                </li>
                <li>
                  <NavLink className="item-menu-normal" to="/trends-date">
                    Tendencias por fecha
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="item-menu-normal"
                    to="/contact"
                    onClick={signOff}
                  >
                    Cerrar Sesión
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div className="pop-up__register">
        <Register />
      </div>
      <div className="pop-up__login">
        <Login /> 
      </div>
      <div className="pop-up__contact">
        <Contact />
      </div>
      <div className="pop-up__reset">
        <Reset />
      </div>
    </header>
  );
};
