import { useState } from "react";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import "./PassengerForm.css";

export function PassengerForm({ passengerCount, onSubmit }) {
  const [passengers, setPassengers] = useState(
    Array(passengerCount)
      .fill()
      .map((_, i) => ({
        id: i,
        lastName: "",
        firstName: "",
        patronymic: "",
        documentType: "passport",
        documentNumber: "",
        birthDate: "",
      })),
  );

  const handleChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Валидация
    const isValid = passengers.every(
      (p) => p.lastName && p.firstName && p.documentNumber && p.birthDate,
    );

    if (!isValid) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    onSubmit(passengers);
  };

  return (
    <form className="passenger-form" onSubmit={handleSubmit}>
      {passengers.map((passenger, index) => (
        <div key={passenger.id} className="passenger-form__section">
          <h3 className="passenger-form__title">Пассажир {index + 1}</h3>

          <div className="form-row">
            <Input
              label="Фамилия"
              value={passenger.lastName}
              onChange={(e) => handleChange(index, "lastName", e.target.value)}
              required
            />
            <Input
              label="Имя"
              value={passenger.firstName}
              onChange={(e) => handleChange(index, "firstName", e.target.value)}
              required
            />
            <Input
              label="Отчество"
              value={passenger.patronymic}
              onChange={(e) =>
                handleChange(index, "patronymic", e.target.value)
              }
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Тип документа</label>
              <select
                value={passenger.documentType}
                onChange={(e) =>
                  handleChange(index, "documentType", e.target.value)
                }
                className="select"
              >
                <option value="passport">Паспорт РФ</option>
                <option value="birth">Свидетельство о рождении</option>
                <option value="foreign">Загранпаспорт</option>
              </select>
            </div>

            <Input
              label="Номер документа"
              value={passenger.documentNumber}
              onChange={(e) =>
                handleChange(index, "documentNumber", e.target.value)
              }
              required
            />

            <Input
              label="Дата рождения"
              type="date"
              value={passenger.birthDate}
              onChange={(e) => handleChange(index, "birthDate", e.target.value)}
              required
            />
          </div>
        </div>
      ))}

      <div className="passenger-form__actions">
        <Button type="submit" variant="primary" size="large">
          Продолжить оплату
        </Button>
      </div>
    </form>
  );
}
