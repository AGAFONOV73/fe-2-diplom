import { Link } from "react-router-dom";
import trainCarriageIcon from "../../../assets/icons/train-carriage.svg";
import "./TrainCard.css";

export function TrainCard({ train }) {
  return (
    <div className="train-card">
      {/* ЛЕВАЯ ЧАСТЬ */}
      <div className="train-card__left">
        <img
          src={trainCarriageIcon}
          alt="train-carriage"
          className="train-icon"
        />
        <div>
          <div className="train-number">№{train.number}</div>
          <div className="train-route">
            {train.from} → {train.to}
          </div>
        </div>
      </div>

      {/* ЦЕНТР */}
      <div className="train-card__center">
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

      {/* ПРАВАЯ ЧАСТЬ */}
      <div className="train-card__right">
        <div className="train-prices">
          <div className="price-row">
            <span>Сидячий</span>
            <span>{train.price} ₽</span>
          </div>
          <div className="price-row">
            <span>Плацкарт</span>
            <span>{train.price + 500} ₽</span>
          </div>
          <div className="price-row">
            <span>Купе</span>
            <span>{train.price + 1200} ₽</span>
          </div>
        </div>

        <div className="train-footer">
          <div className="free-seats">Свободно: {train.freeSeats}</div>

          <Link
            to={`/train/${train.id}`}
            state={{ train }}
            className="select-btn"
          >
            Выбрать места
          </Link>
        </div>
      </div>
    </div>
  );
}
