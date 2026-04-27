// import { Link } from "react-router-dom";
// import { LastTickets } from "../../components/common/LastTickets";
// import { Subscribe } from "../../components/common/Subscribe";
// import { Container } from "../../components/ui/Container";
// import { SectionTitle } from "../../components/ui/SectionTitle";
// import { Button } from "../../components/ui/Button";
// import "./HomePage.css";

// export function HomePage() {
//   return (
//     <div className="home-page">
//       {/* ===== НОВЫЙ БАННЕР С ФОНОМ ===== */}
//       <div className="hero-banner">
//         <Container className="hero-container">
//           {/* Логотип */}
//           <div className="logo-white">🚆 Лого</div>

//           {/* Навигация */}
//           <div className="nav-links-dark">
//             <Link to="/about">О нас</Link>
//             <Link to="/how-it-works">Как это работает</Link>
//             <Link to="/reviews">Отзывы</Link>
//             <Link to="/contacts">Контакты</Link>
//           </div>

//           {/* Слоган + форма поиска */}
//           <div className="hero-split">
//             <div className="slogan-block">
//               <div className="slogan-title">
//                 ВСЯ ЖИЗНЬ - <br />
//                 <span>путешествие!</span>
//               </div>
//               <div className="slogan-sub">
//                 Откройте новые маршруты с комфортом
//               </div>
//             </div>

//             <div className="search-card">
//               <div className="inline-trip">
//                 <div className="form-field">
//                   <label>НАПРАВЛЕНИЕ</label>
//                   <input
//                     type="text"
//                     placeholder="Откуда"
//                     defaultValue="Москва"
//                   />
//                 </div>
//                 <div className="form-field">
//                   <label>ОНЛАЙН</label>
//                   <input
//                     type="text"
//                     placeholder="Куда"
//                     defaultValue="Санкт-Петербург"
//                   />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-field">
//                   <label>ДАТА</label>
//                   <input
//                     type="text"
//                     placeholder="ДД/ММ/ГГГГ"
//                     defaultValue="24/04/2026"
//                   />
//                 </div>
//                 <div className="form-field">
//                   <label>КУДА</label>
//                   <input
//                     type="text"
//                     placeholder="Город прибытия"
//                     defaultValue="Казань"
//                   />
//                 </div>
//               </div>

//               <div className="form-row">
//                 <div className="form-field">
//                   <label>ПАССАЖИРЫ</label>
//                   <select>
//                     <option>1 взрослый</option>
//                     <option>2 взрослых</option>
//                     <option>1 взрослый + ребенок</option>
//                   </select>
//                 </div>
//                 <div className="form-field">
//                   <label>КЛАСС</label>
//                   <select>
//                     <option>Любой</option>
//                     <option>Купе</option>
//                     <option>Плацкарт</option>
//                     <option>СВ</option>
//                   </select>
//                 </div>
//               </div>

//               <button className="btn-find">НАЙТИ БИЛЕТЫ</button>
//               <div className="search-hint">🔹 Низкие цены за 90 суток</div>
//             </div>
//           </div>
//         </Container>
//       </div>

//       {/* ===== СЕКЦИЯ "О НАС" (улучшенная) ===== */}
//       <section className="home-section home-section--light">
//         <Container>
//           <div className="about-full">
//             <SectionTitle>О нас</SectionTitle>
//             <div className="about-text">
//               <p>
//                 Мы рады видеть вас! Мы работаем для Вас с{" "}
//                 <strong>2003 года</strong>. 14 лет мы наблюдаем, как с каждым
//                 днем все больше людей заказывают жд билеты через интернет.
//               </p>
//               <p>
//                 Сегодня можно заказать железнодорожные билеты онлайн всего в 2
//                 клика, но стоит ли это делать? Мы расскажем о преимуществах
//                 заказа через интернет.
//               </p>
//               <p>
//                 <span className="highlight">
//                   Покупать жд билеты дешево можно за 90 суток до отправления
//                   поезда.
//                 </span>
//                 <br />
//                 Благодаря динамическому ценообразованию цена на билеты в это
//                 время самая низкая.
//               </p>
//             </div>
//             <Link to="/about">
//               <Button variant="outline">Подробнее →</Button>
//             </Link>
//           </div>
//         </Container>
//       </section>

//       {/* ===== СЕКЦИЯ "КАК ЭТО РАБОТАЕТ" С ФОНОМ ===== */}
//       <div className="how-section">
//         <Container>
//           <div className="how-header">
//             <SectionTitle className="how-title">Как это работает</SectionTitle>
//             <Link to="/how-it-works">
//               <Button variant="outline-light">Узнать больше →</Button>
//             </Link>
//           </div>

//           <div className="features-row">
//             <div className="feature-card-light">
//               <i className="fas fa-laptop-code feature-icon"></i>
//               <h3 className="feature-title">Удобный заказ на сайте</h3>
//               <p className="feature-desc">
//                 Выберите маршрут, дату и место — всё онлайн без очередей.
//               </p>
//             </div>
//             <div className="feature-card-light">
//               <i className="fas fa-home feature-icon"></i>
//               <h3 className="feature-title">Нет необходимости ехать в офис</h3>
//               <p className="feature-desc">
//                 Покупайте билеты из дома или офиса 24/7.
//               </p>
//             </div>
//             <div className="feature-card-light">
//               <i className="fas fa-globe-asia feature-icon"></i>
//               <h3 className="feature-title">Огромный выбор направлений</h3>
//               <p className="feature-desc">
//                 Тысячи маршрутов по всей России и СНГ.
//               </p>
//             </div>
//           </div>
//         </Container>
//       </div>

//       {/* ===== ПОСЛЕДНИЕ БИЛЕТЫ (ваш компонент) ===== */}
//       <LastTickets />

//       {/* ===== СЕКЦИЯ ОТЗЫВЫ ===== */}
//       <section className="home-section home-section--gray">
//         <Container>
//           <SectionTitle>Отзывы пассажиров</SectionTitle>
//           <div className="reviews-wrapper">
//             <div className="review-card">
//               <div className="review-card__header">
//                 <div className="review-card__avatar">Е</div>
//                 <div className="review-card__info">
//                   <div className="review-card__name">Екатерина Вальнова</div>
//                   <div className="review-card__rating">★★★★★</div>
//                 </div>
//               </div>
//               <ul className="review-list">
//                 <li>Доброжелательная подсказка</li>
//                 <li>На всех этапах помогут правильно заполнить поля</li>
//                 <li>Бесплатная доставка из магазина</li>
//               </ul>
//             </div>
//             <div className="review-card">
//               <div className="review-card__header">
//                 <div className="review-card__avatar">Е</div>
//                 <div className="review-card__info">
//                   <div className="review-card__name">Евгений Стрыкало</div>
//                   <div className="review-card__rating">★★★★★</div>
//                 </div>
//               </div>
//               <ul className="review-list">
//                 <li>Поддерживаюсь до посадки</li>
//                 <li>Сразу после оплаты ж/д билета пришли к вам</li>
//                 <li>СМС-отключение от посетителя</li>
//               </ul>
//             </div>
//           </div>
//           <div className="home-preview__action">
//             <Link to="/reviews">
//               <Button variant="outline">Все отзывы →</Button>
//             </Link>
//           </div>
//         </Container>
//       </section>

//       {/* ===== КОНТАКТЫ + ПОДПИСКА ===== */}
//       <div className="bottom-block">
//         <Container>
//           <div className="bottom-block__inner">
//             {/* Левая колонка: Контакты */}
//             <div className="bottom-block__contact">
//               <h3 className="bottom-block__title">Свяжитесь с нами</h3>
//               <ul className="contact-list">
//                 <li>
//                   <i className="fas fa-phone-alt"></i> 8 (800) 000 00 00
//                 </li>
//                 <li>
//                   <i className="fas fa-envelope"></i> inbox@mail.ru
//                 </li>
//                 <li>
//                   <i className="fas fa-train"></i> tu.train.tickets
//                 </li>
//                 <li>
//                   <i className="fas fa-map-marker-alt"></i> г. Москва
//                 </li>
//                 <li>
//                   <i className="fas fa-road"></i> ул. Московская 27-35
//                 </li>
//                 <li>
//                   <i className="fas fa-credit-card"></i> 555 555
//                 </li>
//               </ul>
//             </div>

//             {/* Правая колонка: Подписка */}
//             <div className="bottom-block__subscribe">
//               <h3 className="bottom-block__title">Подписка</h3>
//               <p className="subscribe-text">Будьте в курсе событий</p>
//               <form className="subscribe-form" id="subscribeForm">
//                 <input
//                   type="email"
//                   className="subscribe-input"
//                   placeholder="e-mail"
//                 />
//                 <button type="submit" className="subscribe-btn">
//                   ОТПРАВИТЬ
//                 </button>
//               </form>
//               <h4 className="social-title">Подписывайтесь на нас</h4>
//               <div className="social-icons">
//                 <a href="#" className="social-icon">
//                   <i className="fab fa-google-plus-g"></i> <span>in G+</span>
//                 </a>
//                 <a href="#" className="social-icon">
//                   <i className="fab fa-facebook-f"></i> <span>f</span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </Container>
//       </div>

//       {/* ===== ПОДПИСКА (ваш компонент, если нужен дополнительно) ===== */}
//       <Subscribe />
//     </div>
//   );
// }
import { Subscribe } from "../../components/common/Subscribe/Subscribe";
import { HeroBanner } from "../../components/common/HeroBanner/HeroBanner";
import { AboutSection } from "../../components/common/AboutSection/AboutSection";
import { HowItWorksSection } from "../../components/common/HowItWorksSection/HowItWorksSection";

import { ReviewsSection } from "../../components/common/ReviewsSection/ReviewsSection";
import { ContactsSubscribe } from "../../components/common/ContactsSubscribe/ContactsSubscribe";

export function HomePage() {
  return (
    <div className="home-page">
      <HeroBanner />
      <AboutSection />
      <HowItWorksSection />

      <ReviewsSection />
      <ContactsSubscribe />
      <Subscribe />
    </div>
  );
}
