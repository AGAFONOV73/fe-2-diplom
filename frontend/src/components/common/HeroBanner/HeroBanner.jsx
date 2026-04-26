import { Link } from "react-router-dom";
import { Container } from "../../ui/Container";
import vectorImg from "../../../assets/icons/map.svg";
import vector1Img from "../../../assets/icons/calendar.svg";
import arrowImg from "../../../assets/icons/arrowImg.png";
import "./HeroBanner.css";

export function HeroBanner() {
  return (
    <div className="hero-banner">
      <div className="header">
        {/* Логотип сверху */}
        <div className="logo-wrapper">
          <Container>
            <div className="logo-white">Лого</div>
          </Container>
        </div>

        {/* Чёрная полоса 94px с навигацией */}
        <div className="top-black-bar">
          <Container className="top-black-bar__container">
            <div className="nav-links-dark">
              <Link to="/about">О нас</Link>
              <Link to="/how-it-works">Как это работает</Link>
              <Link to="/reviews">Отзывы</Link>
              <Link to="/contacts">Контакты</Link>
            </div>
          </Container>
        </div>
      </div>
      {/* Слоган + форма поиска */}
      <Container className="hero-container">
        <div className="hero-split">
          <div className="slogan-block">
            <div className="slogan-title">
              Вся жизнь - <br />
              <span>путешествие!</span>
            </div>
          </div>

          <div className="search-card">
            <div className="form-field">
              <label>Направление</label>
              <div className="direction-row">
                <div className="input-wrapper">
                  <input type="text" placeholder="Откуда" />

                  <img src={vectorImg} alt="" className="input-icon" />
                </div>
                <img src={arrowImg} alt="" className="input-icon-arrow" />
                <div className="input-wrapper">
                  <input type="text" placeholder="Куда" />
                  <img src={vectorImg} alt="" className="input-icon" />
                </div>
              </div>
            </div>
            <div className="form-field">
              <label>Дата</label>
              <div className="date-row">
                <div className="input-wrapper">
                  <input type="text" placeholder="ДД/ММ/ГГ" />
                  <img src={vector1Img} alt="" className="input-icon" />
                </div>
                <div className="input-wrapper">
                  <input type="text" placeholder="ДД/ММ/ГГ" />
                  <img src={vector1Img} alt="" className="input-icon" />
                </div>
              </div>
            </div>
            <button className="btn-find">НАЙТИ БИЛЕТЫ</button>
          </div>
        </div>
      </Container>

      {/* Нижняя полоса 8px */}
      <div className="bottom-orange-bar"></div>
    </div>
  );
}
