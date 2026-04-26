import { Link } from "react-router-dom";
import { Container } from "../../ui/Container";
import { SectionTitle } from "../../ui/SectionTitle";
import { Button } from "../../ui/Button";
import "./AboutSection.css";

export function AboutSection() {
  return (
    <section className="home-section home-section--light">
      <Container>
        <div className="about-full">
          {/* Заголовок сверху */}
          <div className="about-header">
            <SectionTitle className="about-title">О нас</SectionTitle>
          </div>
          {/* Жёлтая полоса + текст (рядом) */}
          <div className="about-content">
            <div className="yellow-bar"></div>
            <div className="about-text">
              <p>
                Мы рады видеть вас! Мы работаем для Вас с{" "}
                <strong>2003 года</strong>. 14 лет мы наблюдаем, как с каждым
                днем все больше людей заказывают жд билеты через интернет.
              </p>
              <p>
                Сегодня можно заказать железнодорожные билеты онлайн всего в 2
                клика, но стоит ли это делать? Мы расскажем о преимуществах
                заказа через интернет.
              </p>
              <p>
                <span className="highlight">
                  Покупать жд билеты дешево можно за 90 суток до отправления
                  поезда.
                  <br />
                  Благодаря динамическому ценообразованию цена на билеты в это
                  время самая низкая.
                </span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
