import { Container } from "../../ui/Container";
import "./ContactsSubscribe.css";

export function ContactsSubscribe() {
  return (
    <div className="bottom-block">
      <Container>
        <div className="bottom-block__inner">
          {/* Левая колонка: Контакты */}
          <div className="bottom-block__contact">
            <h3 className="bottom-block__title">Свяжитесь с нами</h3>
            <ul className="contact-list">
              <li>
                <i className="fas fa-phone-alt"></i> 8 (800) 000 00 00
              </li>
              <li>
                <i className="fas fa-envelope"></i> inbox@mail.ru
              </li>
              <li>
                <i className="fas fa-train"></i> tu.train.tickets
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i> г. Москва
              </li>
              <li>
                <i className="fas fa-road"></i> ул. Московская 27-35
              </li>
              <li>
                <i className="fas fa-credit-card"></i> 555 555
              </li>
            </ul>
          </div>

          {/* Правая колонка: Подписка */}
          <div className="bottom-block__subscribe">
            <h3 className="bottom-block__title">Подписка</h3>
            <p className="subscribe-text">Будьте в курсе событий</p>
            <form className="subscribe-form">
              <input
                type="email"
                className="subscribe-input"
                placeholder="e-mail"
              />
              <button type="submit" className="subscribe-btn">
                ОТПРАВИТЬ
              </button>
            </form>
            <h4 className="social-title">Подписывайтесь на нас</h4>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <i className="fab fa-google-plus-g"></i> <span>in G+</span>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i> <span>f</span>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
