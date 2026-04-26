import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import "./PaymentPage.css";

export function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, selectedSeats, passengers } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!train || !selectedSeats || !passengers) {
    navigate("/search");
    return null;
  }

  const totalPrice = selectedSeats.length * train.price;

  const handlePayment = () => {
    setIsProcessing(true);
    // Имитация обработки платежа
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/confirmation", {
        state: {
          train,
          selectedSeats,
          passengers,
          paymentMethod,
          totalPrice,
        },
      });
    }, 2000);
  };

  return (
    <div className="payment-page">
      <Container>
        <h1 className="page-title">Оплата</h1>

        <div className="payment-page__content">
          <div className="payment-form">
            <h2>Способ оплаты</h2>

            <div className="payment-methods">
              <label className="payment-method">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Банковская карта</span>
              </label>

              <label className="payment-method">
                <input
                  type="radio"
                  name="payment"
                  value="sbp"
                  checked={paymentMethod === "sbp"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>СБП</span>
              </label>

              <label className="payment-method">
                <input
                  type="radio"
                  name="payment"
                  value="applepay"
                  checked={paymentMethod === "applepay"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Apple Pay</span>
              </label>
            </div>

            {paymentMethod === "card" && (
              <div className="card-form">
                <div className="form-group">
                  <label>Номер карты</label>
                  <input type="text" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Срок действия</label>
                    <input type="text" placeholder="MM/YY" />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="123" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="payment-summary">
            <h3>Детали заказа</h3>
            <div className="summary-item">
              <span>Поезд №{train.number}</span>
              <span>
                {train.from} → {train.to}
              </span>
            </div>
            <div className="summary-item">
              <span>Дата отправления</span>
              <span>{train.departureDate}</span>
            </div>
            <div className="summary-item">
              <span>Количество мест</span>
              <span>{selectedSeats.length}</span>
            </div>
            <div className="summary-item">
              <span>Пассажиры</span>
              <span>{passengers.length} чел.</span>
            </div>
            <div className="summary-total">
              <span>Итого к оплате</span>
              <span className="total-price">
                {totalPrice.toLocaleString()} ₽
              </span>
            </div>

            <Button
              variant="primary"
              onClick={handlePayment}
              disabled={isProcessing}
              className="pay-button"
            >
              {isProcessing
                ? "Обработка..."
                : `Оплатить ${totalPrice.toLocaleString()} ₽`}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
