import { Link } from "react-router-dom";
import { Container } from "../../ui/Container";
import { SectionTitle } from "../../ui/SectionTitle";
import { Button } from "../../ui/Button";
import "./ReviewsSection.css";

export function ReviewsSection() {
  return (
    <section className="home-section home-section--gray">
      <Container>
        <SectionTitle>Отзывы пассажиров</SectionTitle>
        <div className="reviews-wrapper">
          <div className="review-card">
            <div className="review-card__header">
              <div className="review-card__avatar">Е</div>
              <div className="review-card__info">
                <div className="review-card__name">Екатерина Вальнова</div>
                <div className="review-card__rating">★★★★★</div>
              </div>
            </div>
            <ul className="review-list">
              <li>Доброжелательная подсказка</li>
              <li>На всех этапах помогут правильно заполнить поля</li>
              <li>Бесплатная доставка из магазина</li>
            </ul>
          </div>
          <div className="review-card">
            <div className="review-card__header">
              <div className="review-card__avatar">Е</div>
              <div className="review-card__info">
                <div className="review-card__name">Евгений Стрыкало</div>
                <div className="review-card__rating">★★★★★</div>
              </div>
            </div>
            <ul className="review-list">
              <li>Поддерживаюсь до посадки</li>
              <li>Сразу после оплаты ж/д билета пришли к вам</li>
              <li>СМС-отключение от посетителя</li>
            </ul>
          </div>
        </div>
        <div className="home-preview__action">
          <Link to="/reviews">
            <Button variant="outline">Все отзывы →</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
