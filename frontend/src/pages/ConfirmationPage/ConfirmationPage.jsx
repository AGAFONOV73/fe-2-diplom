import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import { BookingHeader } from "../../components/common/BookingHeader/BookingHeader";
import { getBookingDraft, clearBookingDraft } from "../../utils/bookingDraft";
import { ContactsSubscribe } from "../../components/common/ContactsSubscribe/ContactsSubscribe";
import trainCarriageIcon from "../../assets/icons/train-carriage.svg";
import passengerIcon from "../../assets/icons/passenger.svg";
import displayIcon from "../../assets/icons/display.svg";
import ticketIcon from "../../assets/icons/ticket.svg";
import conductorIcon from "../../assets/icons/conductor.svg";
import "./ConfirmationPage.css";

export function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const draft = getBookingDraft();
  const { train, selectedSeats, passengers, paymentMethod, totalPrice } =
    location.state || draft || {};
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (!train || !selectedSeats || !passengers) {
      navigate("/search");
    }
  }, [train, selectedSeats, passengers, navigate]);

  if (!train || !selectedSeats || !passengers) {
    return null;
  }

  const bookingNumber =
    "BK" + Math.random().toString(36).substring(2, 10).toUpperCase();

  const handleReturnHome = () => {
    clearBookingDraft();
    navigate("/");
  };

  const handleEditPassengers = () => {
    navigate("/passenger", { state: { train, selectedSeats, passengers } });
  };

  const handleEditPayment = () => {
    navigate("/payment", {
      state: { train, selectedSeats, passengers, paymentMethod, totalPrice },
    });
  };
  const [rating, setRating] = useState(5);
  return (
    <div className={`confirmation-page ${isConfirmed ? "is-success" : ""}`}>
      <BookingHeader activeStep={4} hideSearchAndSteps={isConfirmed} />

      <Container>
        {!isConfirmed ? (
          <div className="confirmation-cards">
            <div className="confirmation-card">
              <h2 className="section-title">Поезд</h2>
              <div className="train-card">
                <div className="train-card__left">
                  <img
                    src={trainCarriageIcon}
                    alt="train"
                    className="train-icon"
                  />
                  <div>
                    <div className="train-number">№{train.number}</div>
                    <div className="train-route">
                      {train.from} → {train.to}
                    </div>
                  </div>
                </div>
                <div className="train-card__center">
                  <div className="station">
                    <div className="time">{train.departureTime}</div>
                    <div className="city">{train.from}</div>
                    <div className="station-name">
                      {train.departureStation || "Курской вокзал"}
                    </div>
                  </div>
                  <div className="duration">
                    <div className="line"></div>
                    <div className="time-text">
                      {train.duration || "9ч 42м"}
                    </div>
                  </div>
                  <div className="station">
                    <div className="time">{train.arrivalTime}</div>
                    <div className="city">{train.to}</div>
                    <div className="station-name">
                      {train.arrivalStation || "Подмосковный вокзал"}
                    </div>
                  </div>
                </div>
                <div className="train-card__right">
                  <div className="train-prices">
                    <div className="price-row">
                      <span>Сидячий</span>
                      <span>{train.price} ₽</span>
                    </div>
                    <div className="price-row">
                      <span>Плацкарт</span>
                      <span>{train.price + 500} ₽</span>
                    </div>
                    <div className="price-row">
                      <span>Купе</span>
                      <span>{train.price + 1200} ₽</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="confirmation-card">
              <h2 className="section-title">Пассажиры</h2>
              <div className="passengers-list">
                {passengers.map((passenger, idx) => (
                  <div key={passenger.id || idx} className="passenger-item">
                    <div className="passenger-left">
                      <img
                        src={passengerIcon}
                        alt="passenger"
                        className="passenger-icon"
                      />
                      <div className="passenger-type">
                        {passenger.type === "adult" ? "Взрослый" : "Детский"}
                      </div>
                    </div>
                    <div className="passenger-right">
                      <div className="passenger-name">
                        {passenger.lastName} {passenger.firstName}{" "}
                        {passenger.patronymic}
                      </div>
                      <div className="passenger-gender">
                        <span className="label">Пол:</span>
                        <span className="value">
                          {passenger.gender === "M" ? "Мужской" : "Женский"}
                        </span>
                      </div>
                      <div className="passenger-birthdate">
                        <span className="label">Дата рождения:</span>
                        <span className="value">
                          {passenger.birthDate || "не указана"}
                        </span>
                      </div>
                      <div className="passenger-document">
                        {passenger.documentType === "passport"
                          ? `Паспорт РФ ${passenger.passportSeries} ${passenger.passportNumber}`
                          : `Свидетельство о рождении ${passenger.birthCertNumber}`}
                      </div>
                      <div className="order-total">
                        <span className="total-label">Всего</span>
                        <span className="total-price">
                          {totalPrice.toLocaleString()} ₽
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="change-button-wrapper">
                <button className="edit-button" onClick={handleEditPassengers}>
                  ИЗМЕНИТЬ
                </button>
              </div>
            </div>

            <div className="confirmation-card">
              <h2 className="section-title">Способ оплаты</h2>
              <div className="payment-block">
                <div className="payment-method">
                  {paymentMethod === "card"
                    ? "Банковской картой"
                    : paymentMethod === "sbp"
                      ? "СБП"
                      : paymentMethod === "cash"
                        ? "Наличными"
                        : "Visa QIWI Wallet"}
                </div>
                <button className="edit-button" onClick={handleEditPayment}>
                  ИЗМЕНИТЬ
                </button>
              </div>
            </div>

            <Button variant="primary" onClick={() => setIsConfirmed(true)}>
              ПОДТВЕРДИТЬ
            </Button>
          </div>
        ) : (
          <div className="success-wrapper">
            <h1 className="success-title">Благодарим Вас за заказ!</h1>
            <div className="success-card">
              <div className="success-order-numbers">
                <div className="order-number-left">
                  <span className="label">№Заказа</span>
                  <strong>{bookingNumber}</strong>
                </div>
                <div className="order-number-right">
                  <span className="label">сумма</span>
                  <strong>{totalPrice.toLocaleString()}</strong>
                  <span className="label"> ₽</span>
                </div>
              </div>
              <div className="success-icons">
                <div>
                  <img src={displayIcon} alt="email" />
                  <span className="success-explanation">
                    билеты будут <br /> отправлены <br /> на ваш e-mail
                  </span>
                </div>
                <div>
                  <img src={ticketIcon} alt="ticket" />
                  <span className="success-explanation">
                    распечатайте <br /> и сохраняйте билеты <br /> до даты
                    поездки
                  </span>
                </div>
                <div>
                  <img src={conductorIcon} alt="conductor" />
                  <span className="success-explanation">
                    предъявите <br /> распечатанные <br /> билеты при посадке
                  </span>
                </div>
              </div>
              <div className="success-text">
                <h2>{passengers[0]?.firstName || "Пассажир"}!</h2>
                <p>Ваш заказ успешно оформлен.</p>
                <p>
                  В ближайшее время с вами свяжется наш оператор для
                  подтверждения.
                </p>
                <p className="thanks-text">
                  Благодарим Вас за оказанное доверие и желаем приятного
                  путешествия!
                </p>
              </div>
              <div className="success-bottom">
                <h3>Оценить сервис</h3>
                <div className="rating-stars">
                  {[...Array(5)].map((_, i) => {
                    const starIndex = i + 1;
                    const isActive = starIndex <= rating;
                    return (
                      <svg
                        key={i}
                        className={`star-icon ${isActive ? "active" : ""}`}
                        onClick={() => setRating(starIndex)}
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill={isActive ? "#ffa800" : "none"}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ cursor: "pointer" }}
                      >
                        <path d="M12 2L15 9H22L16 14L19 21L12 17L5 21L8 14L2 9H9L12 2Z" />
                      </svg>
                    );
                  })}
                </div>
                <button className="return-home-btn" onClick={handleReturnHome}>
                  ВЕРНУТЬСЯ НА ГЛАВНУЮ
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>

      <ContactsSubscribe />
    </div>
  );
}
