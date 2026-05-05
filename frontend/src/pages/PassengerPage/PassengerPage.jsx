import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Container } from "../../components/ui/Container";
import { PassengerForm } from "../../components/common/PassengerForm";
import { BookingHeader } from "../../components/common/BookingHeader/BookingHeader";
import { OrderSummarySidebar } from "../../components/common/OrderSummarySidebar/OrderSummarySidebar";
import { saveBookingDraft, getBookingDraft } from "../../utils/bookingDraft";
import { ContactsSubscribe } from "../../components/common/ContactsSubscribe/ContactsSubscribe";
import "./PassengerPage.css";

export function PassengerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const draft = getBookingDraft();
  const { train, selectedSeats } = location.state || draft || {};

  // Моковые данные для обратного направления (пока нет реальных)
  const returnTrain = {
    number: "0055",
    from: "Санкт-Петербург",
    to: "Москва",
    departureDate: "03.09.2018",
    departureTime: "10:30",
    arrivalTime: "15:00",
  };

  useEffect(() => {
    if (!train || !selectedSeats) {
      navigate("/search");
    }
  }, [train, selectedSeats, navigate]);

  if (!train || !selectedSeats) return null;

  const totalPrice = selectedSeats.length * train.price;

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
          {/* Левая колонка – детали поездки (как на втором скриншоте) */}
          <OrderSummarySidebar
            train={train}
            returnTrain={returnTrain}
            selectedSeats={selectedSeats}
            totalPrice={totalPrice}
          />

          {/* Правая колонка – форма пассажиров */}
          <div className="passenger-page__main">
            <h1 className="passenger-page__title">ПАССАЖИРЫ</h1>
            <PassengerForm
              passengerCount={selectedSeats.length}
              onSubmit={handlePassengersSubmit}
            />
          </div>
        </div>
      </Container>
      <ContactsSubscribe />
    </div>
  );
}
