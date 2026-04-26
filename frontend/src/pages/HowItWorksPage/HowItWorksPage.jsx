import { Container } from "../../components/ui/Container";
import { Button } from "../../components/ui/Button";
import "./HowItWorksPage.css";

export function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Удобный заказ на сайте",
      description: "Выберите маршрут, дату и место — всё онлайн без очередей.",
      icon: "💻",
    },
    {
      number: "02",
      title: "Нет необходимости ехать в офис",
      description: "Покупайте билеты из дома или офиса в любое время суток.",
      icon: "🏠",
    },
    {
      number: "03",
      title: "Огромный выбор направлений",
      description: "Тысячи маршрутов по всей России и странам СНГ.",
      icon: "🌍",
    },
    {
      number: "04",
      title: "Мгновенное подтверждение",
      description: "Билет приходит на email сразу после оплаты.",
      icon: "📧",
    },
    {
      number: "05",
      title: "Безопасная оплата",
      description: "Защита ваших данных и多种 способы оплаты.",
      icon: "🔒",
    },
    {
      number: "06",
      title: "Круглосуточная поддержка",
      description: "Мы всегда готовы помочь с любыми вопросами.",
      icon: "💬",
    },
  ];

  return (
    <div className="how-it-works-page">
      <Container>
        <h1 className="page-title">Как это работает</h1>
        <p className="page-subtitle">Всего несколько шагов — и вы уже в пути</p>

        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.number} className="step-card">
              <div className="step-card__icon">{step.icon}</div>
              <div className="step-card__number">{step.number}</div>
              <h3 className="step-card__title">{step.title}</h3>
              <p className="step-card__description">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="how-it-works__cta">
          <div className="cta-box">
            <h3>Готовы отправиться в путешествие?</h3>
            <p>Начните поиск билетов прямо сейчас</p>
            <Button
              variant="primary"
              onClick={() => (window.location.href = "/search")}
            >
              Найти билеты
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
