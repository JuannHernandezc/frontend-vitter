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

export const Navbar = ({ firebaseUser }) => {
  const [responsive, setResponsive] = useState(false);
  const navigate = useNavigate();

  //Function that allow it had to responsive menu

  const handleResponsive = () => {
    if (responsive) {
      setResponsive(false);
    } else {
      setResponsive(true);
    }
  };

  //Function that allow Logout

  const signOff = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

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
                    to="/register"
                    onClick={handleResponsive}
                  >
                    Registro
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="item-menu"
                    to="/login"
                    onClick={handleResponsive}
                  >
                    Iniciar Sesión
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="item-menu"
                    to="/contact"
                    onClick={handleResponsive}
                  >
                    Contacto
                  </NavLink>
                </li>
              </>
            ) : (
              <>
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
            <li>
              <NavLink className="item-menu-normal" to="/">
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink className="item-menu-normal" to="/register">
                Registro
              </NavLink>
            </li>
            <li>
              <NavLink className="item-menu-normal" to="/login">
                Iniciar Sesión
              </NavLink>
            </li>
            <li>
              <NavLink className="item-menu-normal" to="/contact">
                Contacto
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
