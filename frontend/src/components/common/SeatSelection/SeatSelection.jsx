import { useState } from "react";
import seatingChart from "../../../assets/images/seating-chart.jpg";
import directionRightIcon from "../../../assets/icons/direction-right.svg";

import trainCarriageIcon from "../../../assets/icons/train-carriage.svg";
import leftIcon from "../../../assets/icons/left.svg";
import rightIcon from "../../../assets/icons/right.svg";
import timeIcon from "../../../assets/icons/time.svg";

import "./SeatSelection.css";

export function SeatSelection({
  onSelectSeats,
  maxSeats = 8,
  train = {},
  onTrainChange,
}) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [activeWagon, setActiveWagon] = useState("07");
  const [wagonType, setWagonType] = useState("coupe");
  const [showOtherTrains, setShowOtherTrains] = useState(false);

  // Данные поезда
  const trainData = {
    number: train.number || "116С",
    from: train.from || "Москва",
    to: train.to || "Санкт-Петербург",
    departureTime: train.departureTime || "00:10",
    arrivalTime: train.arrivalTime || "09:52",
    duration: train.duration || "9 часов 42 минуты",
    departureStation: "Курский вокзал",
    arrivalStation: "Ладожский вокзал",
    ...train,
  };

  // Вагоны
  const wagons = [
    {
      id: "07",
      seatsCount: 11,
      topSeats: 3,
      bottomSeats: 8,
      price: 2920,
      service: 3530,
    },
    {
      id: "09",
      seatsCount: 11,
      topSeats: 4,
      bottomSeats: 7,
      price: 2800,
      service: 3400,
    },
  ];

  // Другие поезда
  const otherTrains = [
    {
      id: 1,
      number: "116С",
      from: "Москва",
      to: "Санкт-Петербург",
      departure: "00:10",
      arrival: "09:52",
      duration: "9 часов 42 минуты",
      departureStation: "Курский вокзал",
      arrivalStation: "Ладожский вокзал",
    },
    {
      id: 2,
      number: "042А",
      from: "Москва",
      to: "Санкт-Петербург",
      departure: "08:00",
      arrival: "12:30",
      duration: "4 часа 30 минут",
      departureStation: "Курский вокзал",
      arrivalStation: "Ладожский вокзал",
    },
  ];

  // Генерация мест (по схеме 5x? как на скриншоте)
  const generateSeats = () => {
    const seats = [];
    const seatNumbers = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    ];
    for (let i = 0; i < seatNumbers.length; i++) {
      seats.push({
        id: seatNumbers[i],
        number: seatNumbers[i],
        isAvailable: true,
        isTop: i < 16,
        row: Math.floor(i / 8) + 1,
      });
    }
    return seats;
  };

  const seats = generateSeats();

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

  // Группировка мест по рядам (по 8 мест в ряду)
  const rows = [];
  for (let i = 0; i < seats.length; i += 8) {
    rows.push(seats.slice(i, i + 8));
  }

  const currentWagon = wagons.find((w) => w.id === activeWagon);

  const handleSelectOtherTrain = (otherTrain) => {
    setShowOtherTrains(false);
    if (onTrainChange) {
      onTrainChange(otherTrain);
    }
  };

  return (
    <div className="seat-selection">
      {/* ===== ВЕРХНИЙ БЛОК 1 ===== */}
      {/* 1. Верхний левый угол - иконка + кнопка "Выбрать другой поезд" */}
      <div className="ss-header">
        <img src={rightIcon} alt="right" className="ss-select-train-icon" />
        <button
          className="ss-select-train-btn"
          onClick={() => setShowOtherTrains(!showOtherTrains)}
        >
          Выбрать другой поезд
        </button>
      </div>

      {/* Блок выбора другого поезда (выпадашка) */}
      {showOtherTrains && (
        <div className="ss-other-trains">
          {otherTrains.map((otherTrain) => (
            <div
              key={otherTrain.id}
              className="ss-other-train-item"
              onClick={() => handleSelectOtherTrain(otherTrain)}
            >
              <div className="ss-other-train-number">{otherTrain.number}</div>
              <div className="ss-other-train-route">
                <span>{otherTrain.from}</span>

                <span>{otherTrain.to}</span>
              </div>
              <div className="ss-other-train-time">
                <span>
                  {otherTrain.departure} {otherTrain.arrival}
                </span>
                <span className="ss-other-train-duration">
                  {otherTrain.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Блок из трех частей (горизонтально) */}
      <div className="ss-train-info">
        <div className="ss-train-info__part part-1">
          <div className="ss-train-icon-wrapper">
            <img
              src={trainCarriageIcon}
              alt="train"
              className="ss-select-train-icon"
            />
          </div>
          <div className="ss-train-text">
            <div className="ss-train-number">116С</div>
            <div className="ss-train-route">Адлер →</div>
            <div className="ss-train-route">Москва →</div>
            <div className="ss-train-route">Санкт-Петербург</div>
          </div>
        </div>
        {/* Часть 2: время отправления/прибытия (занимает две ширины) */}
        <div className="ss-train-info__part part-2">
          <div className="ss-time-block">
            <div className="ss-time">{trainData.departureTime}</div>
            <div className="ss-city">{trainData.from}</div>
            <div className="ss-station">{trainData.departureStation}</div>
          </div>
          <div>
            <img
              src={directionRightIcon}
              alt="arrow"
              className="ss-arrow-icon"
            />
          </div>
          <div className="ss-time-block">
            <div className="ss-time">{trainData.arrivalTime}</div>
            <div className="ss-city">{trainData.to}</div>
            <div className="ss-station">{trainData.arrivalStation}</div>
          </div>
        </div>

        {/* Часть 3: иконка, время в пути */}
        <div className="ss-train-info__part part-3">
          <div className="ss-duration-icon">
            <img src={timeIcon} alt="timeIcon" className="ss-time-icon" />
          </div>
          <div className="ss-duration">{trainData.duration}</div>
        </div>
      </div>

      {/* 3. Количество билетов - заголовок */}
      <div className="ss-tickets-title">Количество билетов</div>

      {/* Три блока с количеством билетов (горизонтально) */}
      <div className="ss-tickets-row">
        <div className="ss-ticket-card">
          <button className="ss-ticket-btn">Взрослых — 2</button>
          <div className="ss-ticket-hint">Можно добавить еще 3 пассажиров</div>
        </div>
        <div className="ss-ticket-card">
          <button className="ss-ticket-btn">Детских — 1</button>
          <div className="ss-ticket-hint">
            Можно добавить еще 5 лет или до 10 лет.
          </div>
        </div>
        <div className="ss-ticket-card">
          <button className="ss-ticket-btn">Детских «без места» — 0</button>
        </div>
      </div>

      {/* 4. Тип вагона */}
      <div className="ss-wagon-type-title">Тип вагона</div>
      <div className="ss-wagon-types">
        <button
          className={wagonType === "seat" ? "active" : ""}
          onClick={() => setWagonType("seat")}
        >
          Сидячий
        </button>
        <button
          className={wagonType === "platz" ? "active" : ""}
          onClick={() => setWagonType("platz")}
        >
          Плацкарт
        </button>
        <button
          className={wagonType === "coupe" ? "active" : ""}
          onClick={() => setWagonType("coupe")}
        >
          Купе
        </button>
        <button
          className={wagonType === "lux" ? "active" : ""}
          onClick={() => setWagonType("lux")}
        >
          Люкс
        </button>
      </div>

      {/* Вагоны (07 подсвечен, 09 обычный) */}
      <div className="ss-wagons">
        {wagons.map((wagon) => (
          <button
            key={wagon.id}
            className={`ss-wagon-btn ${activeWagon === wagon.id ? "active" : ""}`}
            onClick={() => setActiveWagon(wagon.id)}
          >
            {wagon.id}
          </button>
        ))}
      </div>

      {/* Информация о выбранном вагоне */}
      <div className="ss-wagon-info">
        <div className="ss-wagon-number">{activeWagon} вагон</div>
        <div className="ss-wagon-details">
          <span>Места {currentWagon?.seatsCount}</span>
          <span>Верхние {currentWagon?.topSeats}</span>
          <span>Нижние {currentWagon?.bottomSeats}</span>
        </div>
        <div className="ss-wagon-prices">
          <span>Стоимость {currentWagon?.price} ₽</span>
          <span>Обслуживание {currentWagon?.service} ₽</span>
        </div>
      </div>

      {/* 5. Схема расположения мест (как на скриншоте) */}
      {/* <div className="ss-seats-scheme">
        <div className="ss-scheme-header">
          <div className="ss-scheme-window">🚪</div>
          <div className="ss-scheme-seats-label">МЕСТА 1-8</div>
          <div className="ss-scheme-window">🚪</div>
        </div>

        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="ss-seat-row">
            <div className="ss-seat-row-number">
              {rowIndex * 8 + 1}-{rowIndex * 8 + 8}
            </div>
            {row.map((seat) => (
              <div
                key={seat.id}
                className={`ss-seat 
                  ${selectedSeats.includes(seat.id) ? "selected" : ""} 
                  ${!seat.isAvailable ? "unavailable" : ""}`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.number}
              </div>
            ))}
          </div>
        ))}
      </div> */}
      <div className="ss-seats-scheme">
        <img src={seatingChart} alt="Схема мест" className="ss-seats-image" />
      </div>
      <div className="ss-selected-info">Места не выбраны</div>

      {/* ===== НИЖНИЙ БЛОК 2 (повтор) ===== */}
      {/* Верхний правый угол - иконка и кнопка "Выбрать другой поезд" */}
      <div className="ss-footer-header">
        <img src={leftIcon} alt="left" className="ss-select-train-icon" />
        <button
          className="ss-select-train-btn ss-footer-btn"
          onClick={() => setShowOtherTrains(!showOtherTrains)}
        >
          Выбрать другой поезд
        </button>
      </div>

      {/* Повтор блока с информацией о поезде */}
      <div className="ss-train-info ss-footer-train-info">
        <div className="ss-train-info__part part-1">
          <div className="ss-train-icon">
            <img
              src={trainCarriageIcon}
              alt="train"
              className="ss-select-train-icon"
            />
          </div>
          <div className="ss-train-route">
            <div className="ss-train-number">{trainData.number}</div>
            {trainData.from} — {trainData.to}
          </div>
        </div>
        <div className="ss-train-info__part part-2">
          <div className="ss-time-block">
            <div className="ss-time">{trainData.departureTime}</div>
            <div className="ss-city">{trainData.from}</div>
            <div className="ss-station">{trainData.departureStation}</div>
          </div>
          <div>
            <img
              src={directionRightIcon}
              alt="arrow"
              className="ss-arrow-icon"
            />
          </div>
          <div className="ss-time-block">
            <div className="ss-time">{trainData.arrivalTime}</div>
            <div className="ss-city">{trainData.to}</div>
            <div className="ss-station">{trainData.arrivalStation}</div>
          </div>
        </div>
        <div className="ss-train-info__part part-3">
          <div className="ss-duration-icon">
            <img src={timeIcon} alt="timeIcon" className="ss-time-icon" />
          </div>
          <div className="ss-duration">{trainData.duration}</div>
        </div>
      </div>

      {/* Повтор блока количества билетов */}
      <div className="ss-tickets-title">Количество билетов</div>
      <div className="ss-tickets-row">
        <div className="ss-ticket-card">
          <button className="ss-ticket-btn">Взрослых — 2</button>
          <div className="ss-ticket-hint">Можно добавить еще 3 пассажиров</div>
        </div>
        <div className="ss-ticket-card">
          <button className="ss-ticket-btn">Детских — 0</button>
        </div>
        <div className="ss-ticket-card">
          <button className="ss-ticket-btn">Детских «без места» — 0</button>
        </div>
      </div>
    </div>
  );
}
