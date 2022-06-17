import { NavLink } from "react-router-dom";
import "../styles/Footer.css";
export const Footer = () => {
  return (
    <footer className="footer">
      <img src="https://res.cloudinary.com/danhzm8qb/image/upload/v1652191031/vitter/logotexto_reduced_min_noptc4.png" alt="Logo Vitter" />
      <NavLink className="item-footer" to="/terms">Terminos y condiciones</NavLink>
      <NavLink className="item-footer" to="/contact">Contacto con Vitter</NavLink>
      <p>VITTER &copy; - 2022</p>
    </footer>
  );
};
