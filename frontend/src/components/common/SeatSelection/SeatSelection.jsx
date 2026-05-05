import { useState } from "react";
import seatingChart from "../../../assets/images/seating-chart.jpg";
import directionRightIcon from "../../../assets/icons/direction-right.svg";
import trainCarriageIcon from "../../../assets/icons/train-carriage.svg";
import leftIcon from "../../../assets/icons/left.svg";
import rightIcon from "../../../assets/icons/right.svg";
import timeIcon from "../../../assets/icons/time.svg";
import sitIcon from "../../../assets/icons/sit.svg";
import platskartIcon from "../../../assets/icons/platskart.svg";
import cupeIcon from "../../../assets/icons/cupe.svg";
import luxIcon from "../../../assets/icons/lux.svg";
import cupIcon from "../../../assets/icons/cup.svg";
import linenIcon from "../../../assets/icons/linen.svg";
import snowflakeIcon from "../../../assets/icons/snowflake.svg";
import wifiIcon from "../../../assets/icons/wi-fi.svg";
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

  // Функция для разбивки строки типа "9 часов 42 минуты"
  const formatDuration = (durationStr) => {
    const match = durationStr.match(/(\d+)\s*часов?\s*(\d+)\s*минут?/i);
    if (match) {
      return {
        hours: `${match[1]} часов`,
        minutes: `${match[2]} минут`,
      };
    }
    return { hours: durationStr, minutes: "" };
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

  // Генерация мест
  const generateSeats = () => {
    const seats = [];
    for (let i = 1; i <= 32; i++) {
      seats.push({
        id: i,
        number: i,
        isAvailable: true,
        isTop: i <= 16,
        row: Math.floor((i - 1) / 8) + 1,
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
    if (onSelectSeats) onSelectSeats(newSelectedSeats);
  };

  const rows = [];
  for (let i = 0; i < seats.length; i += 8) rows.push(seats.slice(i, i + 8));

  const currentWagon = wagons.find((w) => w.id === activeWagon);

  const handleSelectOtherTrain = (otherTrain) => {
    setShowOtherTrains(false);
    if (onTrainChange) onTrainChange(otherTrain);
  };

  return (
    <div className="seat-selection">
      {/* Верхний блок: кнопка "Выбрать другой поезд" */}
      <div className="ss-header">
        <img src={rightIcon} alt="right" className="ss-select-train-icon" />
        <button
          className="ss-select-train-btn"
          onClick={() => setShowOtherTrains(!showOtherTrains)}
        >
          Выбрать другой поезд
        </button>
      </div>

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
                <span>{otherTrain.from}</span> → <span>{otherTrain.to}</span>
              </div>
              <div className="ss-other-train-time">
                <span>
                  {otherTrain.departure} — {otherTrain.arrival}
                </span>
                <span className="ss-other-train-duration">
                  {otherTrain.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Информация о поезде (3 колонки) */}
      <div className="ss-train-info">
        <div className="ss-train-info__part part-1">
          <img
            src={trainCarriageIcon}
            alt="train"
            className="ss-train-icon-img"
          />
          <div className="ss-train-text">
            <div className="ss-train-number">116С</div>
            <div className="ss-train-route">Адлер →</div>
            <div className="ss-train-route">Москва →</div>
            <div className="ss-train-route">Санкт-Петербург</div>
          </div>
        </div>
        <div className="ss-train-info__part part-2">
          <div className="ss-time-block">
            <div className="ss-time">{trainData.departureTime}</div>
            <div className="ss-city">{trainData.from}</div>
            <div className="ss-station">{trainData.departureStation}</div>
          </div>
          <img src={directionRightIcon} alt="arrow" className="ss-arrow-icon" />
          <div className="ss-time-block">
            <div className="ss-time">{trainData.arrivalTime}</div>
            <div className="ss-city">{trainData.to}</div>
            <div className="ss-station">{trainData.arrivalStation}</div>
          </div>
        </div>
        <div className="ss-train-info__part part-3">
          <img src={timeIcon} alt="timeIcon" className="ss-time-icon" />
          <div className="ss-duration">
            <div className="duration-hours">
              {formatDuration(trainData.duration).hours}
            </div>
            <div className="duration-minutes">
              {formatDuration(trainData.duration).minutes}
            </div>
          </div>
        </div>
      </div>

      {/* Количество билетов */}
      <div className="ss-tickets-title">Количество билетов</div>
      <div className="ss-tickets-row">
        <div className="ss-ticket-card">
          <button className="ss-ticket-btn">Взрослых — 2</button>
          <div className="ss-ticket-hint">Можно добавить еще 3 пассажиров</div>
        </div>
        <div className="ss-ticket-card">
          <button className="ss-ticket-btn">Детских — 1</button>
          <div className="ss-ticket-hint">
            Можно добавить еще 3 детей до 10 лет. Свое место в вагоне, как у
            взрослых, но дешевле в среднем на 50-65%
          </div>
        </div>
        <div className="ss-ticket-card">
          <button className="ss-ticket-btn">Детских «без места» — 0</button>
        </div>
      </div>

      {/* Тип вагона */}
      <div className="ss-wagon-type-title">Тип вагона</div>
      <div className="ss-wagon-types">
        <button
          className={wagonType === "seat" ? "active" : ""}
          onClick={() => setWagonType("seat")}
        >
          <img src={sitIcon} alt="Сидячий" className="wagon-type-icon" />
          <span>Сидячий</span>
        </button>
        <button
          className={wagonType === "platz" ? "active" : ""}
          onClick={() => setWagonType("platz")}
        >
          <img src={platskartIcon} alt="Плацкарт" className="wagon-type-icon" />
          <span>Плацкарт</span>
        </button>
        <button
          className={wagonType === "coupe" ? "active" : ""}
          onClick={() => setWagonType("coupe")}
        >
          <img src={cupeIcon} alt="Купе" className="wagon-type-icon" />
          <span>Купе</span>
        </button>
        <button
          className={wagonType === "lux" ? "active" : ""}
          onClick={() => setWagonType("lux")}
        >
          <img src={luxIcon} alt="Люкс" className="wagon-type-icon" />
          <span>Люкс</span>
        </button>
      </div>

      {/* Блок выбора вагонов (сверху, отдельно) */}
      <div className="ss-wagon-left">
        <div className="ss-wagons-switch">
          <span className="wagon-switch-label">Вагоны</span>
          <div className="wagon-switch-buttons">
            {wagons.map((wagon) => (
              <button
                key={wagon.id}
                className={`wagon-switch-btn ${activeWagon === wagon.id ? "active" : ""}`}
                onClick={() => setActiveWagon(wagon.id)}
              >
                {wagon.id}
              </button>
            ))}
          </div>
        </div>
        <div className="ss-wagon-note">
          Нумерация вагонов
          <br />
          начинается с головы поезда
        </div>
      </div>

      {/* Основная информация о вагоне (три колонки) */}
      <div className="ss-wagon-info">
        <div className="ss-wagon-center">
          <div className="ss-wagon-number">
            {activeWagon} <span>вагон</span>
          </div>
        </div>
        <div className="ss-wagon-right">
          <div className="ss-wagon-seats">
            <div className="ss-wagon-seats-title">
              Места {currentWagon?.seatsCount}
            </div>
            <div className="ss-wagon-stats">
              <div>
                Верхние <strong>{currentWagon?.topSeats}</strong>
              </div>
              <div>
                Нижние <strong>{currentWagon?.bottomSeats}</strong>
              </div>
            </div>
          </div>
          <div className="ss-wagon-prices">
            <div className="price-label">Стоимость</div>
            <div className="price-value">{currentWagon?.price} ₽</div>
            <div className="price-value">{currentWagon?.service} ₽</div>
          </div>
          <div className="ss-wagon-service">
            <div className="service-label">Обслуживание</div>
            <div className="service-text">
              <span>кондиционер</span>
              <span>ФПК</span>
            </div>
            <div className="service-icons">
              <img
                src={snowflakeIcon}
                alt="кондиционер"
                className="service-icon"
              />
              <img src={cupIcon} alt="питание" className="service-icon" />
              <img src={linenIcon} alt="бельё" className="service-icon" />
              <img src={wifiIcon} alt="wi-fi" className="service-icon" />
            </div>
          </div>
        </div>
      </div>

      {/* Футер с количеством людей */}
      <div className="ss-wagon-footer">
        <span className="people-count">
          11 человек выбирают места в этом поезде
        </span>
      </div>

      {/* Схема мест */}
      <div className="ss-seats-scheme">
        <img src={seatingChart} alt="Схема мест" className="ss-seats-image" />
      </div>
      <div className="ss-selected-info">Места не выбраны</div>

      {/* Нижний повторяющийся блок */}
      <div className="ss-footer-header">
        <img src={leftIcon} alt="left" className="ss-select-train-icon" />
        <button
          className="ss-select-train-btn ss-footer-btn"
          onClick={() => setShowOtherTrains(!showOtherTrains)}
        >
          Выбрать другой поезд
        </button>
      </div>

      <div className="ss-train-info ss-footer-train-info">
        <div className="ss-train-info__part part-1">
          <img
            src={trainCarriageIcon}
            alt="train"
            className="ss-train-icon-img"
          />
          <div className="ss-train-text">
            <div className="ss-train-number">{trainData.number}</div>
            <div className="ss-train-route">
              {trainData.from} — {trainData.to}
            </div>
          </div>
        </div>
        <div className="ss-train-info__part part-2">
          <div className="ss-time-block">
            <div className="ss-time">{trainData.departureTime}</div>
            <div className="ss-city">{trainData.from}</div>
            <div className="ss-station">{trainData.departureStation}</div>
          </div>
          <img src={directionRightIcon} alt="arrow" className="ss-arrow-icon" />
          <div className="ss-time-block">
            <div className="ss-time">{trainData.arrivalTime}</div>
            <div className="ss-city">{trainData.to}</div>
            <div className="ss-station">{trainData.arrivalStation}</div>
          </div>
        </div>
        <div className="ss-train-info__part part-3">
          <img src={timeIcon} alt="timeIcon" className="ss-time-icon" />
          <div className="ss-duration">
            <div className="duration-hours">
              {formatDuration(trainData.duration).hours}
            </div>
            <div className="duration-minutes">
              {formatDuration(trainData.duration).minutes}
            </div>
          </div>
        </div>
      </div>

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
