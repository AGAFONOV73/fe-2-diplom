import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import "./ConfirmationPage.css";

export function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, selectedSeats, passengers, paymentMethod, totalPrice } =
    location.state || {};

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

  return (
    <div className="confirmation-page">
      <Container>
        <div className="confirmation-card">
          <div className="success-icon">✓</div>
          <h1>Билеты успешно оформлены!</h1>
          <p className="success-message">
            Номер бронирования: <strong>{bookingNumber}</strong>
          </p>
          <p>Билеты отправлены на вашу электронную почту</p>

          <div className="order-details">
            <h2>Детали заказа</h2>

            <div className="details-grid">
              <div className="detail-item">
                <span className="label">Поезд:</span>
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
              <div className="detail-item">
                <span className="label">Места:</span>
                <span className="value">{selectedSeats.join(", ")}</span>
              </div>
              <div className="detail-item">
                <span className="label">Пассажиры:</span>
                <span className="value">{passengers.length} чел.</span>
              </div>
              <div className="detail-item">
                <span className="label">Способ оплаты:</span>
                <span className="value">
                  {paymentMethod === "card"
                    ? "Банковская карта"
                    : paymentMethod === "sbp"
                      ? "СБП"
                      : "Apple Pay"}
                </span>
              </div>
              <div className="detail-item total">
                <span className="label">Сумма оплаты:</span>
                <span className="value">{totalPrice.toLocaleString()} ₽</span>
              </div>
            </div>
          </div>

          <div className="actions">
            <Button variant="primary" onClick={() => navigate("/")}>
              На главную
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              Распечатать билеты
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
