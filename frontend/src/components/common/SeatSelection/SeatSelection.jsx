import { useMemo, useState } from "react";
import { Seat } from "./Seat";
import "./SeatSelection.css";

export function SeatSelection({ onSelectSeats, maxSeats = 4 }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [wagonType, setWagonType] = useState("second");

  // Стабильная схема мест без перегенерации на каждый рендер.
  const seats = useMemo(
    () =>
      Array.from({ length: 54 }, (_, i) => ({
        id: i + 1,
        number: i + 1,
        isAvailable: (i + 1) % 7 !== 0,
      })),
    [],
  );

  const handleSeatClick = (seat) => {
    if (!seat.isAvailable) return;

    let newSelectedSeats;
    if (selectedSeats.includes(seat.id)) {
      newSelectedSeats = selectedSeats.filter((id) => id !== seat.id);
    } else {
      if (selectedSeats.length >= maxSeats) {
        alert(`Максимум можно выбрать ${maxSeats} мест`);
        return;
      }
      newSelectedSeats = [...selectedSeats, seat.id];
    }

    setSelectedSeats(newSelectedSeats);
    if (onSelectSeats) {
      onSelectSeats(newSelectedSeats);
    }
  };

  // Группировка мест по рядам (примерно по 4 места в ряду)
  const rows = [];
  for (let i = 0; i < seats.length; i += 4) {
    rows.push(seats.slice(i, i + 4));
  }

  const wagons = [
    { id: "07", seats: "Верхние 8 / Нижние 8", price: "2 920 ₽ - 3 530 ₽" },
    { id: "10", seats: "Верхние 10 / Нижние 11", price: "2 020 ₽ - 3 030 ₽" },
  ];

  return (
    <div className="seat-selection">
      <div className="seat-selection__header">
        <h3>ВЫБОР МЕСТ</h3>
        <button type="button" className="seat-selection__switch-btn">
          Выбрать другой поезд
        </button>
      </div>

      <div className="seat-selection__meta">
        <div>116С Москва → Санкт-Петербург</div>
        <div>4 часа 42 минуты</div>
      </div>

      <div className="seat-selection__types">
        <button
          type="button"
          className={wagonType === "second" ? "active" : ""}
          onClick={() => setWagonType("second")}
        >
          Сидячий
        </button>
        <button
          type="button"
          className={wagonType === "third" ? "active" : ""}
          onClick={() => setWagonType("third")}
        >
          Плацкарт
        </button>
        <button
          type="button"
          className={wagonType === "coupe" ? "active" : ""}
          onClick={() => setWagonType("coupe")}
        >
          Купе
        </button>
        <button
          type="button"
          className={wagonType === "lux" ? "active" : ""}
          onClick={() => setWagonType("lux")}
        >
          Люкс
        </button>
      </div>

      {wagons.map((wagon) => (
        <div className="seat-scheme" key={wagon.id}>
          <div className="scheme-top">
            <div className="wagon-number">
              <strong>{wagon.id}</strong>
              <span>вагон</span>
            </div>
            <div className="wagon-stats">
              <span>{wagon.seats}</span>
              <span>{wagon.price}</span>
            </div>
            <div className="seat-legend">
              <div className="legend-item">
                <div className="seat-demo seat-demo--available"></div>
                <span>Свободно</span>
              </div>
              <div className="legend-item">
                <div className="seat-demo seat-demo--selected"></div>
                <span>Выбрано</span>
              </div>
            </div>
          </div>

          <div className="scheme-header">
            <div className="window">Окно</div>
            <div className="aisle">Проход</div>
            <div className="window">Окно</div>
          </div>

          {rows.map((row, rowIndex) => (
            <div key={`${wagon.id}-${rowIndex}`} className="seat-row">
              {row.map((seat) => (
                <Seat
                  key={`${wagon.id}-${seat.id}`}
                  seat={seat}
                  isSelected={selectedSeats.includes(`${wagon.id}-${seat.id}`)}
                  onSelect={(clickedSeat) =>
                    handleSeatClick({
                      ...clickedSeat,
                      id: `${wagon.id}-${clickedSeat.id}`,
                    })
                  }
                />
              ))}
            </div>
          ))}
        </div>
      ))}

      <div className="seat-selection__footer">
        <div className="selected-info">
          Выбрано мест: {selectedSeats.length}
        </div>
      </div>
    </div>
  );
}
