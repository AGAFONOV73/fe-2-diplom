import "./BookingSidebar.css";

const lastTickets = [
  { from: "Санкт-Петербург", to: "Самара", price: 2500 },
  { from: "Москва", to: "Казань", price: 3500 },
  { from: "Казань", to: "Нижний новгород", price: 3800 },
];

export function BookingSidebar() {
  return (
    <aside className="booking-sidebar">
      <div className="booking-sidebar__panel booking-sidebar__panel--dark">
        <div className="booking-sidebar__title">Дата поездки</div>
        <input className="booking-sidebar__input" value="30.08.2018" readOnly />

        <div className="booking-sidebar__title">Дата возвращения</div>
        <input className="booking-sidebar__input" value="09.09.2018" readOnly />

        <div className="booking-sidebar__option">Купе</div>
        <div className="booking-sidebar__option">Плацкарт</div>
        <div className="booking-sidebar__option">Сидячий</div>
        <div className="booking-sidebar__option">Люкс</div>
        <div className="booking-sidebar__option">Wi-Fi</div>
        <div className="booking-sidebar__option">Экспресс</div>

        <div className="booking-sidebar__cost">
          <span>Стоимость</span>
          <div className="booking-sidebar__range" />
        </div>
      </div>

      <div className="booking-sidebar__panel">
        <div className="booking-sidebar__last-title">ПОСЛЕДНИЕ БИЛЕТЫ</div>
        {lastTickets.map((ticket) => (
          <div className="booking-sidebar__ticket" key={`${ticket.from}-${ticket.to}`}>
            <div className="booking-sidebar__cities">
              <span>{ticket.from}</span>
              <span>{ticket.to}</span>
            </div>
            <div className="booking-sidebar__price">{ticket.price.toLocaleString()} ₽</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
