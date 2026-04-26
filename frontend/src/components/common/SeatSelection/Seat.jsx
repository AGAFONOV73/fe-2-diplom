import "./SeatSelection.css";

export function Seat({ seat, isSelected, onSelect }) {
  const status = !seat.isAvailable
    ? "unavailable"
    : isSelected
      ? "selected"
      : "available";

  return (
    <button
      className={`seat seat--${status}`}
      onClick={() => onSelect(seat)}
      disabled={!seat.isAvailable}
    >
      {seat.number}
    </button>
  );
}
