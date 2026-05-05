import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import { BookingHeader } from "../../components/common/BookingHeader/BookingHeader";
import { OrderSummarySidebar } from "../../components/common/OrderSummarySidebar/OrderSummarySidebar";
import { getBookingDraft, clearBookingDraft } from "../../utils/bookingDraft";
import { ContactsSubscribe } from "../../components/common/ContactsSubscribe/ContactsSubscribe";
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

  return (
    <div className="confirmation-page">
      <BookingHeader activeStep={4} />
      <Container>
        <div className="confirmation-layout">
          <OrderSummarySidebar
            train={train}
            selectedSeats={selectedSeats}
            passengers={passengers}
            totalPrice={totalPrice}
          />
          <div className="confirmation-main">
            {!isConfirmed ? (
              <div className="confirmation-card">
                <h1>ПРОВЕРКА ЗАКАЗА</h1>
                <p className="success-message">
                  Номер заказа: <strong>{bookingNumber}</strong>
                </p>

                <div className="order-details">
                  <h2>Поезд</h2>
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="label">Маршрут:</span>
                      <span className="value">
                        №{train.number} {train.from} → {train.to}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Дата отправления:</span>
                      <span className="value">
                        {train.departureDate} в {train.departureTime}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="label">Время прибытия:</span>
                      <span className="value">{train.arrivalTime}</span>
                    </div>
                  </div>
                </div>

                <div className="order-details">
                  <h2>Пассажиры</h2>
                  <div className="details-grid">
                    {passengers.map((passenger, index) => (
                      <div
                        className="detail-item"
                        key={`${passenger.id}-${index}`}
                      >
                        <span className="label">Пассажир {index + 1}:</span>
                        <span className="value">
                          {passenger.lastName} {passenger.firstName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-details">
                  <h2>Способ оплаты</h2>
                  <div className="detail-item">
                    <span className="value">
                      {paymentMethod === "card"
                        ? "Банковской картой"
                        : paymentMethod === "sbp"
                          ? "PayPal"
                          : paymentMethod === "cash"
                            ? "Наличными"
                            : "Visa QIWI Wallet"}
                    </span>
                  </div>
                </div>

                <div className="detail-item total">
                  <span className="label">Всего</span>
                  <span className="value">{totalPrice.toLocaleString()} ₽</span>
                </div>

                <div className="actions">
                  <Button
                    variant="primary"
                    onClick={() => setIsConfirmed(true)}
                  >
                    ПОДТВЕРДИТЬ
                  </Button>
                  <Button variant="outline" onClick={() => window.print()}>
                    ИЗМЕНИТЬ
                  </Button>
                </div>
              </div>
            ) : (
              <div className="confirmation-card confirmation-card--success">
                <h1>Благодарим Вас за заказ!</h1>
                <p className="success-message">
                  №Заказа <strong>{bookingNumber}</strong>{" "}
                  <span>сумма {totalPrice.toLocaleString()} ₽</span>
                </p>
                <div className="success-icons">
                  <div>билеты будут отправлены на ваш e-mail</div>
                  <div>распечатайте и сохраняйте билеты до даты поездки</div>
                  <div>предъявите распечатанные билеты при посадке</div>
                </div>
                <div className="success-text">
                  <h2>
                    {passengers[0]?.firstName || "Пассажир"}, ваш заказ успешно
                    оформлен.
                  </h2>
                  <p>
                    В ближайшее время с вами свяжется наш оператор для
                    подтверждения.
                  </p>
                </div>
                <div className="success-bottom">
                  <span>Оценить сервис ★ ☆ ☆ ☆ ☆</span>
                  <Button variant="outline" onClick={handleReturnHome}>
                    ВЕРНУТЬСЯ НА ГЛАВНУЮ
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
      <ContactsSubscribe />
    </div>
  );
}
