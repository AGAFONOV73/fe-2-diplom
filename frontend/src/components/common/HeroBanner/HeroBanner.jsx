import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../ui/Container";
import vectorImg from "../../../assets/icons/map.svg";
import vector1Img from "../../../assets/icons/calendar.svg";
import arrowImg from "../../../assets/icons/arrowImg.png";
import "./HeroBanner.css";

const cities = [
  "Москва",
  "Санкт-Петербург",
  "Казань",
  "Самара",
  "Нижний Новгород",
  "Екатеринбург",
  "Новосибирск",
  "Ростов-на-Дону",
  "Владивосток",
  "Сочи",
];

function Calendar({ selectedDate, onSelect }) {
  const today = new Date();
  const [monthOffset, setMonthOffset] = useState(0);

  const currentMonth = new Date(
    today.getFullYear(),
    today.getMonth() + monthOffset,
    1,
  );

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="calendar-dropdown">
      <div className="calendar-header">
        <button onClick={() => setMonthOffset(monthOffset - 1)}>&lt;</button>
        <span>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button onClick={() => setMonthOffset(monthOffset + 1)}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {days.map((d) => {
          const dateString = `${("0" + d).slice(-2)}.${("0" + (currentMonth.getMonth() + 1)).slice(-2)}.${currentMonth.getFullYear()}`;
          const selected = selectedDate === dateString;
          return (
            <div
              key={d}
              className={`calendar-day ${selected ? "selected" : ""}`}
              onClick={() => onSelect(dateString)}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function HeroBanner() {
  const navigate = useNavigate();
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [filteredFrom, setFilteredFrom] = useState(cities);
  const [filteredTo, setFilteredTo] = useState(cities);

  const handleCityFilter = (value, type) => {
    const filtered = cities.filter((c) =>
      c.toLowerCase().includes(value.toLowerCase()),
    );
    if (type === "from") {
      setFromValue(value);
      setFilteredFrom(filtered);
      setOpenDropdown("from");
    } else {
      setToValue(value);
      setFilteredTo(filtered);
      setOpenDropdown("to");
    }
  };

  const selectCity = (city, type) => {
    if (type === "from") {
      setFromValue(city);
    } else {
      setToValue(city);
    }
    setOpenDropdown(null);
  };

  const handleSearch = () => {
    // Можно передать параметры поиска через state или URL
    navigate("/search", {
      state: {
        from: fromValue,
        to: toValue,
        dateFrom: dateFrom,
        dateTo: dateTo,
      },
    });
  };

  return (
    <div className="hero-banner">
      <div className="header">
        <div className="logo-wrapper">
          <Container>
            <div className="logo-white">Лого</div>
          </Container>
        </div>

        <div className="top-black-bar">
          <Container className="top-black-bar__container">
            <div className="nav-links-dark">
              <Link to="/about">О нас</Link>
              <Link to="/how-it-works">Как это работает</Link>
              <Link to="/reviews">Отзывы</Link>
              <Link to="/contacts">Контакты</Link>
            </div>
          </Container>
        </div>
      </div>

      <Container className="hero-container">
        <div className="hero-split">
          <div className="slogan-block">
            <div className="slogan-title">
              Вся жизнь - <br />
              <span>путешествие!</span>
            </div>
          </div>

          <div className="search-card">
            <div className="form-field">
              <label>Направление</label>
              <div className="direction-row">
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Откуда"
                    value={fromValue}
                    onChange={(e) => handleCityFilter(e.target.value, "from")}
                  />
                  <img
                    src={vectorImg}
                    alt=""
                    className="input-icon"
                    onClick={() =>
                      setOpenDropdown(openDropdown === "from" ? null : "from")
                    }
                  />
                  {openDropdown === "from" && (
                    <div className="city-dropdown">
                      {filteredFrom.map((city) => (
                        <div
                          key={city}
                          className="city-item"
                          onClick={() => selectCity(city, "from")}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <img src={arrowImg} alt="" className="input-icon-arrow" />
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Куда"
                    value={toValue}
                    onChange={(e) => handleCityFilter(e.target.value, "to")}
                  />
                  <img
                    src={vectorImg}
                    alt=""
                    className="input-icon"
                    onClick={() =>
                      setOpenDropdown(openDropdown === "to" ? null : "to")
                    }
                  />
                  {openDropdown === "to" && (
                    <div className="city-dropdown">
                      {filteredTo.map((city) => (
                        <div
                          key={city}
                          className="city-item"
                          onClick={() => selectCity(city, "to")}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-field">
              <label>Дата</label>
              <div className="date-row">
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="ДД/ММ/ГГ"
                    value={dateFrom}
                    readOnly
                  />
                  <img
                    src={vector1Img}
                    alt=""
                    className="input-icon"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "dateFrom" ? null : "dateFrom",
                      )
                    }
                  />
                  {openDropdown === "dateFrom" && (
                    <Calendar
                      selectedDate={dateFrom}
                      onSelect={(date) => {
                        setDateFrom(date);
                        setOpenDropdown(null);
                      }}
                    />
                  )}
                </div>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="ДД/ММ/ГГ"
                    value={dateTo}
                    readOnly
                  />
                  <img
                    src={vector1Img}
                    alt=""
                    className="input-icon"
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === "dateTo" ? null : "dateTo",
                      )
                    }
                  />
                  {openDropdown === "dateTo" && (
                    <Calendar
                      selectedDate={dateTo}
                      onSelect={(date) => {
                        setDateTo(date);
                        setOpenDropdown(null);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            <button
              className="btn-find"
              onClick={() => {
                console.log("Клик!");
                window.location.href = "/search";
              }}
            >
              НАЙТИ БИЛЕТЫ
            </button>
          </div>
        </div>
      </Container>

      <div className="bottom-orange-bar"></div>
    </div>
  );
}
