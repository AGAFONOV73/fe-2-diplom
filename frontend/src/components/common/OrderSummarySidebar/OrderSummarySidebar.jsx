import "./OrderSummarySidebar.css";

export function OrderSummarySidebar({
  train,
  selectedSeats = [],
  passengers = [],
  totalPrice = 0,
}) {
  return (
    <aside className="order-summary">
      <div className="order-summary__head">ДЕТАЛИ ПОЕЗДКИ</div>

      <div className="order-summary__section">
        <div className="order-summary__section-title">Туда</div>
        <div className="order-summary__line">
          <span>№ Поезда</span>
          <strong>{train?.number || "116С"}</strong>
        </div>
        <div className="order-summary__line">
          <span>Маршрут</span>
          <strong>
            {train?.from || "Москва"} - {train?.to || "Санкт-Петербург"}
          </strong>
        </div>
        <div className="order-summary__time">
          <div>
            <strong>{train?.departureTime || "00:10"}</strong>
            <span>{train?.from || "Москва"}</span>
          </div>
          <div className="order-summary__arrow">→</div>
          <div>
            <strong>{train?.arrivalTime || "09:52"}</strong>
            <span>{train?.to || "Санкт-Петербург"}</span>
          </div>
        </div>
      </div>

      <div className="order-summary__section">
        <div className="order-summary__section-title">Обратно</div>
        <div className="order-summary__line">
          <span>№ Поезда</span>
          <strong>{train?.number || "116С"}</strong>
        </div>
        <div className="order-summary__time">
          <div>
            <strong>{train?.departureTime || "00:10"}</strong>
            <span>{train?.to || "Санкт-Петербург"}</span>
          </div>
          <div className="order-summary__arrow">→</div>
          <div>
            <strong>{train?.arrivalTime || "09:52"}</strong>
            <span>{train?.from || "Москва"}</span>
          </div>
        </div>
      </div>

      <div className="order-summary__section">
        <div className="order-summary__section-title">Пассажиры</div>
        <div className="order-summary__line">
          <span>{passengers.length || selectedSeats.length || 2} Взрослых</span>
          <strong>
            {Math.max(passengers.length || selectedSeats.length || 2, 1) * 1920} ₽
          </strong>
        </div>
      </div>

      <div className="order-summary__total">
        <span>ИТОГ</span>
        <strong>{(totalPrice || 7760).toLocaleString()} ₽</strong>
      </div>
    </aside>
  );
}
