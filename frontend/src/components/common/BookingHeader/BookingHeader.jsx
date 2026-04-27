import { Link } from "react-router-dom";
import { Container } from "../../ui/Container";
import "./BookingHeader.css";

const steps = [
  { id: 1, label: "Билеты" },
  { id: 2, label: "Пассажиры" },
  { id: 3, label: "Оплата" },
  { id: 4, label: "Проверка" },
];

export function BookingHeader({ activeStep = 1 }) {
  return (
    <header className="booking-header">
      <div className="booking-header__top">
        <Container className="booking-header__top-inner">
          <div className="booking-header__logo">Лого</div>
          <nav className="booking-header__nav">
            <Link to="/about">О нас</Link>
            <Link to="/how-it-works">Как это работает</Link>
            <Link to="/reviews">Отзывы</Link>
            <Link to="/contacts">Контакты</Link>
          </nav>
        </Container>
      </div>

      <div className="booking-header__search">
        <Container className="booking-header__search-inner">
          <div className="booking-search-group">
            <span className="booking-search-group__title">Направление</span>
            <div className="booking-search-group__row">
              <input type="text" placeholder="Откуда" />
              <input type="text" placeholder="Куда" />
            </div>
          </div>
          <div className="booking-search-group">
            <span className="booking-search-group__title">Дата</span>
            <div className="booking-search-group__row">
              <input type="text" placeholder="ДД/ММ/ГГ" />
              <input type="text" placeholder="ДД/ММ/ГГ" />
            </div>
          </div>
          <button type="button" className="booking-header__search-btn">
            НАЙТИ БИЛЕТЫ
          </button>
        </Container>
      </div>

      <div className="booking-steps">
        <Container className="booking-steps__inner">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`booking-step ${activeStep >= step.id ? "booking-step--active" : ""}`}
            >
              <span className="booking-step__number">{step.id}</span>
              <span>{step.label}</span>
            </div>
          ))}
        </Container>
      </div>
    </header>
  );
}
