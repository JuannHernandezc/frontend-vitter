//Imports React Router DOM
import { NavLink } from "react-router-dom";

//Imports FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

//Imports Styles
import "../styles/Nav.css";
import { useState } from "react";

export const Navbar = () => {
  const [responsive, setResponsive] = useState(false);
  const handleResponsive = () => {
    if (responsive) {
      setResponsive(false);
    } else {
      setResponsive(true);
    }
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
              />
            </NavLink>
          </div>
          <ul>
            <li>
              <NavLink className="item-menu home" to="/">
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink className="item-menu" to="/register">
                Registro
              </NavLink>
            </li>
            <li>
              <NavLink className="item-menu" to="/login">
                Iniciar Sesión
              </NavLink>
            </li>
            <li>
              <NavLink className="item-menu" to="/contact">
                Contacto
              </NavLink>
            </li>
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
