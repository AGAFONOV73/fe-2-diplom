import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../../ui/Container";
import mapIcon from "../../../assets/icons/map.svg";
import calendarIcon from "../../../assets/icons/calendar.svg";
import swapIcon from "../../../assets/icons/swap.svg";
import "./BookingHeader.css";

const cities = [
  "Москва",
  "Санкт-Петербург",
  "Казань",
  "Самара",
  "Нижний Новгород",
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
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => setMonthOffset(monthOffset - 1)}>&lt;</button>
        <span>{monthNames[currentMonth.getMonth()]}</span>
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

export function BookingHeader({ activeStep = 1, initialData, onSearch }) {
  const navigate = useNavigate();
  const [from, setFrom] = useState(initialData?.from || "");
  const [to, setTo] = useState(initialData?.to || "");
  const [dateFrom, setDateFrom] = useState(initialData?.dateFrom || "");
  const [dateTo, setDateTo] = useState(initialData?.dateTo || "");
  const [open, setOpen] = useState(null);
  const [filteredFrom, setFilteredFrom] = useState(cities);
  const [filteredTo, setFilteredTo] = useState(cities);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFrom(initialData.from || "");
      setTo(initialData.to || "");
      setDateFrom(initialData.dateFrom || "");
      setDateTo(initialData.dateTo || "");
    }
  }, [initialData]);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const handleCityFilter = (value, type) => {
    const filtered = cities.filter((c) =>
      c.toLowerCase().includes(value.toLowerCase()),
    );
    if (type === "from") {
      setFrom(value);
      setFilteredFrom(filtered);
      setOpen("from");
    } else {
      setTo(value);
      setFilteredTo(filtered);
      setOpen("to");
    }
  };

  const handleSearchClick = () => {
    const searchData = { from, to, dateFrom, dateTo };

    if (onSearch) {
      setLoading(true);
      onSearch(searchData);
    } else {
      // Иначе переходим на страницу поиска (с главной)
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/search", { state: { searchData } });
      }, 1500);
    }
  };

  return (
    <header className="booking-header">
      <div className="booking-header__logo-wrapper">
        <Container>
          <div className="booking-header__logo">Лого</div>
        </Container>
      </div>

      <div className="booking-header__nav-bar">
        <Container className="booking-header__nav-inner">
          <nav className="booking-header__nav">
            <Link to="/about">О нас</Link>
            <Link to="/how-it-works">Как это работает</Link>
            <Link to="/reviews">Отзывы</Link>
            <Link to="/contacts">Контакты</Link>
          </nav>
        </Container>
      </div>

      <div className="booking-header__search">
        <Container className="booking-header__search-inner">
          <div className="booking-search-group">
            <span className="booking-search-group__title">Направление</span>
            <div className="booking-search-group__row">
              <div className="input-with-icon">
                <input
                  value={from}
                  placeholder="Откуда"
                  onChange={(e) => handleCityFilter(e.target.value, "from")}
                />
                <img
                  src={mapIcon}
                  className="input-icon"
                  alt=""
                  onClick={() => setOpen(open === "from" ? null : "from")}
                />
                {open === "from" && (
                  <div className="dropdown">
                    {filteredFrom.map((c) => (
                      <div
                        key={c}
                        onClick={() => {
                          setFrom(c);
                          setOpen(null);
                        }}
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className="swap-btn" onClick={handleSwap}>
                <img src={swapIcon} alt="" className="swap-icon" />
              </button>

              <div className="input-with-icon">
                <input
                  value={to}
                  placeholder="Куда"
                  onChange={(e) => handleCityFilter(e.target.value, "to")}
                />
                <img
                  src={mapIcon}
                  className="input-icon"
                  alt=""
                  onClick={() => setOpen(open === "to" ? null : "to")}
                />
                {open === "to" && (
                  <div className="dropdown">
                    {filteredTo.map((c) => (
                      <div
                        key={c}
                        onClick={() => {
                          setTo(c);
                          setOpen(null);
                        }}
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="booking-search-group booking-search-group--date">
            <span className="booking-search-group__title">Дата</span>
            <div className="booking-search-group__row">
              <div className="input-with-icon">
                <input value={dateFrom} placeholder="Туда" readOnly />
                <img
                  src={calendarIcon}
                  className="input-icon"
                  alt=""
                  onClick={() =>
                    setOpen(open === "dateFrom" ? null : "dateFrom")
                  }
                />
                {open === "dateFrom" && (
                  <Calendar
                    selectedDate={dateFrom}
                    onSelect={(d) => {
                      setDateFrom(d);
                      setOpen(null);
                    }}
                  />
                )}
              </div>
              <div className="input-with-icon">
                <input value={dateTo} placeholder="Обратно" readOnly />
                <img
                  src={calendarIcon}
                  className="input-icon"
                  alt=""
                  onClick={() => setOpen(open === "dateTo" ? null : "dateTo")}
                />
                {open === "dateTo" && (
                  <Calendar
                    selectedDate={dateTo}
                    onSelect={(d) => {
                      setDateTo(d);
                      setOpen(null);
                    }}
                  />
                )}
              </div>
            </div>

            <div className="search-btn-wrapper">
              <button
                className={`booking-header__search-btn ${loading ? "loading" : ""}`}
                onClick={handleSearchClick}
                disabled={loading}
              >
                НАЙТИ БИЛЕТЫ
              </button>
            </div>
          </div>
        </Container>
      </div>

      <div className="booking-steps">
        <Container className="booking-steps__inner">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`booking-step ${activeStep >= n ? "booking-step--active" : ""}`}
            >
              <span className="booking-step__number">{n}</span>
              <span>
                {["Билеты", "Пассажиры", "Оплата", "Проверка"][n - 1]}
              </span>
            </div>
          ))}
        </Container>
      </div>

      {/* Полоса загрузки — ПОД booking-steps */}
      {loading && (
        <div className="loading-bar-wrapper">
          <div className="loading-bar-container">
            <div className="loading-bar"></div>
          </div>
        </div>
      )}
    </header>
  );
}
