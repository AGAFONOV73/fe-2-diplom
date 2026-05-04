import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import { SeatSelection } from "../../components/common/SeatSelection";
import { BookingHeader } from "../../components/common/BookingHeader/BookingHeader";
import { SearchFilters } from "../../components/common/SearchFilters";
import { saveBookingDraft, getBookingDraft } from "../../utils/bookingDraft";
import "./TrainPage.css";

export function TrainPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSeats, setSelectedSeats] = useState([]);

  const fallbackTrain = {
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
  const train =
    location.state?.train || getBookingDraft()?.train || fallbackTrain;

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      saveBookingDraft({ train, selectedSeats });
      navigate("/passenger", { state: { train, selectedSeats } });
    }
  };

  return (
    <div className="train-page">
      <BookingHeader activeStep={1} />
      <Container>
        <div className="train-page__layout">
          <SearchFilters />

          <div className="train-page__main">
            <div className="train-page__header">
              <h1 className="train-page__title">ВЫБОР МЕСТ</h1>
              {/* <div className="train-info"> */}
              {/* <div className="train-info__item">
                  <span className="label">Поезд</span>
                  <span className="value">№{train.number}</span>
                </div> */}
              {/* <div className="train-info__item">
                  <span className="label">Откуда</span>
                  <span className="value">{train.from}</span>
                </div> */}
              {/* <div className="train-info__item">
                  <span className="label">Куда</span>
                  <span className="value">{train.to}</span>
                </div> */}
              {/* </div> */}
            </div>

            <div className="train-page__content">
              <SeatSelection onSelectSeats={setSelectedSeats} />
            </div>

            <div className="train-page__footer">
              <div className="total-info">
                <span>Выбрано мест: {selectedSeats.length}</span>
                <span className="total-price">
                  Итого: {(selectedSeats.length * train.price).toLocaleString()}{" "}
                  ₽
                </span>
              </div>
              <Button
                variant="primary"
                onClick={handleContinue}
                disabled={selectedSeats.length === 0}
              >
                ДАЛЕЕ
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
