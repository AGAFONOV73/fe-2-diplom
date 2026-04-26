import { useState } from "react";
import { Seat } from "./Seat";
import "./SeatSelection.css";

export function SeatSelection({ onSelectSeats, maxSeats = 4 }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Генерация мест (пример: вагон с 54 местами)
  const seats = Array.from({ length: 54 }, (_, i) => ({
    id: i + 1,
    number: i + 1,
    isAvailable: Math.random() > 0.3, // 70% мест свободны
    isSelected: false,
  }));

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

  return (
    <div className="seat-selection">
      <div className="seat-selection__header">
        <h3>Выбор мест</h3>
        <div className="seat-legend">
          <div className="legend-item">
            <div className="seat-demo seat-demo--available"></div>
            <span>Свободно</span>
          </div>
          <div className="legend-item">
            <div className="seat-demo seat-demo--selected"></div>
            <span>Выбрано</span>
          </div>
          <div className="legend-item">
            <div className="seat-demo seat-demo--unavailable"></div>
            <span>Занято</span>
          </div>
        </div>
      </div>

      <div className="seat-scheme">
        <div className="scheme-header">
          <div className="window">Окно</div>
          <div className="aisle">Проход</div>
          <div className="window">Окно</div>
        </div>

        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {row.map((seat) => (
              <Seat
                key={seat.id}
                seat={seat}
                isSelected={selectedSeats.includes(seat.id)}
                onSelect={handleSeatClick}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="seat-selection__footer">
        <div className="selected-info">
          Выбрано мест: {selectedSeats.length}
        </div>
      </div>
    </div>
  );
}
