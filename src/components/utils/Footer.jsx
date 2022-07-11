import { NavLink } from "react-router-dom";
import "../styles/Footer.css";
export const Footer = () => {
  const openPopUpContact = () => {
    const popUp = document.getElementsByClassName('pop-up__contact');
    popUp[0].style.bottom = '0%';
  }
  return (
    <footer className="footer">
      <img src="https://res.cloudinary.com/danhzm8qb/image/upload/v1652191031/vitter/logotexto_reduced_min_noptc4.png" alt="Logo Vitter" />
      <NavLink className="item-footer" to="/terms">Terminos y condiciones</NavLink>
      <NavLink className="item-footer" to="/" onClick={openPopUpContact}>Contacto con Vitter</NavLink>
      <p>VITTER &copy; - 2022</p>
    </footer>
  );
};
