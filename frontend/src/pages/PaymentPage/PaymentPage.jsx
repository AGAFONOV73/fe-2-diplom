import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import { BookingHeader } from "../../components/common/BookingHeader/BookingHeader";
import { OrderSummarySidebar } from "../../components/common/OrderSummarySidebar/OrderSummarySidebar";
import { saveBookingDraft, getBookingDraft } from "../../utils/bookingDraft";
import { ContactsSubscribe } from "../../components/common/ContactsSubscribe/ContactsSubscribe";
import "./PaymentPage.css";

export function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const draft = getBookingDraft();
  const { train, selectedSeats, passengers } = location.state || draft || {};
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!train || !selectedSeats || !passengers) {
      navigate("/search");
    }
  }, [train, selectedSeats, passengers, navigate]);

  if (!train || !selectedSeats || !passengers) return null;

  const totalPrice = selectedSeats.length * train.price;

  const handlePayment = () => {
    if (!phone.trim() || !email.trim()) {
      alert("Введите телефон и email");
      return;
    }

    setIsProcessing(true);
    // Имитация обработки платежа
    setTimeout(() => {
      setIsProcessing(false);
      saveBookingDraft({
        train,
        selectedSeats,
        passengers,
        paymentMethod,
        totalPrice,
      });
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
      <BookingHeader activeStep={3} />
      <Container>
        <div className="payment-page__layout">
          <OrderSummarySidebar
            train={train}
            selectedSeats={selectedSeats}
            passengers={passengers}
            totalPrice={totalPrice}
          />

          <div className="payment-page__main">
            <div className="payment-page__content">
              <div className="payment-form">
                <h2>Персональные данные</h2>
                <div className="form-row">
                  <div className="form-group">
                    <label>Фамилия</label>
                    <input
                      type="text"
                      value={passengers[0]?.lastName || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Имя</label>
                    <input
                      type="text"
                      value={passengers[0]?.firstName || ""}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label>Отчество</label>
                    <input
                      type="text"
                      value={passengers[0]?.patronymic || ""}
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Контактный телефон</label>
                  <input
                    type="text"
                    placeholder="+7 ___ ___ __ __"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="inbox@gmail.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

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
                    <span>Банковской картой</span>
                  </label>

                  <label className="payment-method">
                    <input
                      type="radio"
                      name="payment"
                      value="sbp"
                      checked={paymentMethod === "sbp"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>PayPal</span>
                  </label>

                  <label className="payment-method">
                    <input
                      type="radio"
                      name="payment"
                      value="applepay"
                      checked={paymentMethod === "applepay"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>Visa QIWI Wallet</span>
                  </label>
                </div>

                <div className="payment-method payment-method--cash">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Наличными</span>
                </div>
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
                  {isProcessing ? "Обработка..." : "КУПИТЬ БИЛЕТЫ"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <ContactsSubscribe />
    </div>
  );
}
