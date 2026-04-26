import { useState } from "react";
import { Button } from "../../ui/Button";
import "./Subscribe.css";

export function Subscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // Имитация отправки
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus(null), 3000);
    }, 1000);
  };

  return (
    <section className="subscribe">
      <div className="container">
        <div className="subscribe__content">
          <h2 className="subscribe__title">Подпишитесь на новости</h2>
          <p className="subscribe__text">
            Будьте в курсе акций и специальных предложений
          </p>

          <form className="subscribe__form" onSubmit={handleSubmit}>
            <input
              type="email"
              className="subscribe__input"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="primary"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Подписка..." : "Подписаться"}
            </Button>
          </form>

          {status === "success" && (
            <div className="subscribe__success">✅ Спасибо за подписку!</div>
          )}
        </div>
      </div>
    </section>
  );
}
