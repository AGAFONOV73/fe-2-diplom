// import { Link } from "react-router-dom";
// import "./Footer.css";

// export function Footer() {
//   return (
//     <footer className="footer">
//       <div className="container">
//         <div className="footer__content">
//           <div className="footer__section">
//             <h3 className="footer__title">TrainTickets</h3>
//             <p className="footer__text">
//               Покупайте ЖД билеты онлайн быстро и удобно
//             </p>
//           </div>

//           <div className="footer__section">
//             <h4>Навигация</h4>
//             <ul className="footer__links">
//               <li>
//                 <Link to="/about">О нас</Link>
//               </li>
//               <li>
//                 <Link to="/how-it-works">Как это работает</Link>
//               </li>
//               <li>
//                 <Link to="/reviews">Отзывы</Link>
//               </li>
//               <li>
//                 <Link to="/search">Поиск билетов</Link>
//               </li>
//             </ul>
//           </div>

//           <div className="footer__section">
//             <h4>Контакты</h4>
//             <ul className="footer__contacts">
//               <li>📞 (800) 000 00 00</li>
//               <li>✉️ inbox@mail.ru</li>
//               <li>📍 г. Москва, ул. Московская 27-35</li>
//             </ul>
//           </div>

//           <div className="footer__section">
//             <h4>Мы в соцсетях</h4>
//             <div className="footer__social">
//               <a href="#" target="_blank" rel="noopener noreferrer">
//                 📘
//               </a>
//               <a href="#" target="_blank" rel="noopener noreferrer">
//                 📷
//               </a>
//               <a href="#" target="_blank" rel="noopener noreferrer">
//                 🐦
//               </a>
//               <a href="#" target="_blank" rel="noopener noreferrer">
//                 💬
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="footer__bottom">
//           <p>© 2003-2025 TrainTickets. Все права защищены.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

import { Link } from "react-router-dom";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__container">
        <div className="footer-logo">🚆 TrainTickets</div>
        <div className="footer-icon">
          <i className="fas fa-train"></i>
        </div>
        <div className="footer-year">2018 WEB</div>
      </div>
    </footer>
  );
}
