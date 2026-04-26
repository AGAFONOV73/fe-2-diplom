import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import { PassengerForm } from "../../components/common/PassengerForm";
import "./PassengerPage.css";

export function PassengerPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, selectedSeats } = location.state || {};
  const [passengers, setPassengers] = useState([]);

  if (!train || !selectedSeats) {
    navigate("/search");
    return null;
  }

  const handlePassengersSubmit = (passengerData) => {
    setPassengers(passengerData);
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
      <Container>
        <h1 className="page-title">Данные пассажиров</h1>

        <div className="passenger-page__summary">
          <div className="summary-card">
            <h3>Информация о поездке</h3>
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
      </Container>
    </div>
  );
}
