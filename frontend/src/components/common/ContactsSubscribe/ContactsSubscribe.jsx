import { Container } from "../../ui/Container";
import mapIcon from "../../../assets/icons/map.svg";
import callIcon from "../../../assets/icons/call.svg";
import letterIcon from "../../../assets/icons/letter.svg";
import trainIcon from "../../../assets/icons/train.svg";
import playIcon from "../../../assets/icons/play.svg";
import groupIcon from "../../../assets/icons/group.svg";
import groupinIcon from "../../../assets/icons/groupin.svg";
import facebookIcon from "../../../assets/icons/facebook.svg";
import telegrammIcon from "../../../assets/icons/telegramm.svg";
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
                <img src={callIcon} alt="call" className="contact-icon-img" />
                <span>8 (800) 000 00 00</span>
              </li>
              <li>
                <img
                  src={letterIcon}
                  alt="letter"
                  className="contact-icon-img"
                />
                <span>inbox@mail.ru</span>
              </li>
              <li>
                <img src={trainIcon} alt="train" className="contact-icon-img" />
                <span>tu.train.tickets</span>
              </li>
              <li>
                <img src={mapIcon} alt="map" className="contact-icon-img" />
                <span>
                  г. Москва <br /> ул. Московская 27-35 <br /> 555 555
                </span>
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
                <img src={playIcon} alt="play" className="contact-icon-img" />
              </a>
              <a href="#" className="social-icon">
                <img
                  src={groupinIcon}
                  alt="groupin"
                  className="contact-icon-img"
                />
              </a>
              <a href="#" className="social-icon">
                <img src={groupIcon} alt="group" className="contact-icon-img" />
              </a>
              <a href="#" className="social-icon">
                <img
                  src={facebookIcon}
                  alt="facebook"
                  className="contact-icon-img"
                />
              </a>
              <a href="#" className="social-icon">
                <img
                  src={telegrammIcon}
                  alt="telegramm"
                  className="contact-icon-img"
                />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
