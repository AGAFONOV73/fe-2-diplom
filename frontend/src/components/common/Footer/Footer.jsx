import { Link } from "react-router-dom";
import groupupIcon from "../../../assets/icons/groupup.svg";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer-logo">Лого</div>
        <div className="footer-icon">
          <img src={groupupIcon} alt="groupup" className="contact-icon-img" />
        </div>
        <div className="footer-year">2018 WEB</div>
      </div>
    </footer>
  );
}
