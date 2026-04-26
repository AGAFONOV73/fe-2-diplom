import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../ui/Container";
import { SectionTitle } from "../../ui/SectionTitle";
import "./LastTickets.css";

export function LastTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    const fetchTickets = async () => {
      try {
        // Здесь будет реальный API запрос
        const mockTickets = [
          {
            id: 1,
            from: "Москва",
            to: "Санкт-Петербург",
            trainNumber: "042А",
            departureTime: "10:00",
            arrivalTime: "18:25",
            price: 3450,
            date: "2026-04-26",
          },
          {
            id: 2,
            from: "Екатеринбург",
            to: "Новосибирск",
            trainNumber: "087М",
            departureTime: "08:15",
            arrivalTime: "22:40",
            price: 5870,
            date: "2026-04-27",
          },
          {
            id: 3,
            from: "Казань",
            to: "Москва",
            trainNumber: "003А",
            departureTime: "13:30",
            arrivalTime: "20:15",
            price: 4120,
            date: "2026-04-28",
          },
          {
            id: 4,
            from: "Нижний Новгород",
            to: "Санкт-Петербург",
            trainNumber: "055Б",
            departureTime: "09:45",
            arrivalTime: "19:30",
            price: 3890,
            date: "2026-04-29",
          },
        ];
        setTickets(mockTickets);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка загрузки билетов:", error);
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <section className="last-tickets">
        <Container>
          <SectionTitle>Билеты со скидкой</SectionTitle>
          <div className="last-tickets__loading">Загрузка...</div>
        </Container>
      </section>
    );
  }

  return (
    <section className="last-tickets">
      <Container>
        <SectionTitle>Билеты со скидкой</SectionTitle>
        <div className="last-tickets__grid">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <div className="ticket-card__route">
                <span className="ticket-card__city">{ticket.from}</span>
                <span className="ticket-card__arrow">→</span>
                <span className="ticket-card__city">{ticket.to}</span>
              </div>
              <div className="ticket-card__train">
                🚆 {ticket.trainNumber}, {ticket.departureTime} →{" "}
                {ticket.arrivalTime}
              </div>
              <div className="ticket-card__date">📅 {ticket.date}</div>
              <div className="ticket-card__price">
                {ticket.price.toLocaleString()} ₽
              </div>
              <Link to={`/train/${ticket.id}`} className="ticket-card__btn">
                Выбрать
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
