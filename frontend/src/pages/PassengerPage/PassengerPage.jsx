import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "../../components/ui/Container";
import { PassengerForm } from "../../components/common/PassengerForm";
import { BookingHeader } from "../../components/common/BookingHeader/BookingHeader";
import { OrderSummarySidebar } from "../../components/common/OrderSummarySidebar/OrderSummarySidebar";
import { saveBookingDraft, getBookingDraft } from "../../utils/bookingDraft";
import "./PassengerPage.css";

export function PassengerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const draft = getBookingDraft();
  const { train, selectedSeats } = location.state || draft || {};

  useEffect(() => {
    if (!train || !selectedSeats) {
      navigate("/search");
    }
  }, [train, selectedSeats, navigate]);

  if (!train || !selectedSeats) return null;

  const handlePassengersSubmit = (passengerData) => {
    saveBookingDraft({ train, selectedSeats, passengers: passengerData });
    navigate("/payment", {
      state: {
        train,
        selectedSeats,
        passengers: passengerData,
      },
    });
  };

  return (
    <div className="passenger-page">
      <BookingHeader activeStep={2} />
      <Container>
        <div className="passenger-page__layout">
          <OrderSummarySidebar
            train={train}
            selectedSeats={selectedSeats}
            totalPrice={selectedSeats.length * train.price}
          />

          <div className="passenger-page__main">
            <h1 className="page-title passenger-page__title">ПАССАЖИРЫ</h1>
            <div className="passenger-page__summary">
              <div className="summary-card">
                <h3>ДЕТАЛИ ПОЕЗДКИ</h3>
                <p>
                  Поезд №{train.number}: {train.from} → {train.to}
                </p>
                <p>
                  Дата отправления: {train.departureDate} в {train.departureTime}
                </p>
                <p>Выбрано мест: {selectedSeats.length}</p>
                <p className="total-price">
                  Общая стоимость:{" "}
                  {(selectedSeats.length * train.price).toLocaleString()} ₽
                </p>
              </div>
            </div>

            <PassengerForm
              passengerCount={selectedSeats.length}
              onSubmit={handlePassengersSubmit}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
