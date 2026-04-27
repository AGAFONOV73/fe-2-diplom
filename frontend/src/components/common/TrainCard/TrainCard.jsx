import { Link } from "react-router-dom";
import "./TrainCard.css";

export function TrainCard({ train }) {
  return (
    <div className="train-card">
      <div className="train-card__header">
        <div className="train-number">Поезд №{train.number}</div>
        <div className="train-price">{train.price.toLocaleString()} ₽</div>
      </div>

      <div className="train-card__route">
        <div className="station">
          <div className="time">{train.departureTime}</div>
          <div className="city">{train.from}</div>
        </div>
        <div className="duration">
          <div className="line"></div>
          <div className="time-text">{train.duration}</div>
        </div>
        <div className="station">
          <div className="time">{train.arrivalTime}</div>
          <div className="city">{train.to}</div>
        </div>
      </div>

      <div className="train-card__footer">
        <div className="free-seats">Свободных мест: {train.freeSeats}</div>
        <Link to={`/train/${train.id}`} state={{ train }} className="select-btn">
          Выбрать места
        </Link>
      </div>
    </div>
  );
}
