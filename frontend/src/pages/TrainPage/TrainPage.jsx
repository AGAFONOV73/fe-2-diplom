import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import { SeatSelection } from "../../components/common/SeatSelection";
import "./TrainPage.css";

export function TrainPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Моковые данные поезда
  const train = {
    id: id,
    number: "001А",
    from: "Москва",
    to: "Санкт-Петербург",
    departureDate: "15 марта 2024",
    departureTime: "08:00",
    arrivalTime: "12:30",
    duration: "4ч 30м",
    price: 3500,
  };

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      navigate("/passenger", { state: { train, selectedSeats } });
    }
  };

  return (
    <div className="train-page">
      <Container>
        <div className="train-page__header">
          <h1 className="train-page__title">
            Поезд №{train.number} {train.from} → {train.to}
          </h1>
          <div className="train-info">
            <div className="train-info__item">
              <span className="label">Отправление:</span>
              <span className="value">
                {train.departureDate} в {train.departureTime}
              </span>
            </div>
            <div className="train-info__item">
              <span className="label">Прибытие:</span>
              <span className="value">{train.arrivalTime}</span>
            </div>
            <div className="train-info__item">
              <span className="label">В пути:</span>
              <span className="value">{train.duration}</span>
            </div>
          </div>
        </div>

        <div className="train-page__content">
          <SeatSelection onSelectSeats={setSelectedSeats} />
        </div>

        <div className="train-page__footer">
          <div className="total-info">
            <span>Выбрано мест: {selectedSeats.length}</span>
            <span className="total-price">
              Итого: {(selectedSeats.length * train.price).toLocaleString()} ₽
            </span>
          </div>
          <Button
            variant="primary"
            onClick={handleContinue}
            disabled={selectedSeats.length === 0}
          >
            Продолжить
          </Button>
        </div>
      </Container>
    </div>
  );
}
