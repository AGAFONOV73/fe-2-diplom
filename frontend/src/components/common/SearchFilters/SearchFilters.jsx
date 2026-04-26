import { useState } from "react";
import "./SearchFilters.css";

export function SearchFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    priceMin: "",
    priceMax: "",
    departureStart: "",
    departureEnd: "",
    trainTypes: [],
    amenities: [],
  });

  const trainTypes = [
    { id: "fast", label: "Скорый" },
    { id: "passenger", label: "Пассажирский" },
    { id: "express", label: "Экспресс" },
  ];

  const amenities = [
    { id: "wifi", label: "Wi-Fi" },
    { id: "conditioner", label: "Кондиционер" },
    { id: "bio", label: "Биотуалет" },
    { id: "food", label: "Питание" },
  ];

  const handleChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleCheckboxChange = (key, id, checked) => {
    const current = filters[key];
    const updated = checked
      ? [...current, id]
      : current.filter((item) => item !== id);
    handleChange(key, updated);
  };

  const handleReset = () => {
    const resetFilters = {
      priceMin: "",
      priceMax: "",
      departureStart: "",
      departureEnd: "",
      trainTypes: [],
      amenities: [],
    };
    setFilters(resetFilters);
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  return (
    <div className="search-filters">
      <div className="search-filters__header">
        <h3>Фильтры</h3>
        <button className="reset-btn" onClick={handleReset}>
          Сбросить
        </button>
      </div>

      <div className="filter-group">
        <h4>Цена</h4>
        <div className="price-range">
          <input
            type="number"
            placeholder="от"
            value={filters.priceMin}
            onChange={(e) => handleChange("priceMin", e.target.value)}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="до"
            value={filters.priceMax}
            onChange={(e) => handleChange("priceMax", e.target.value)}
          />
        </div>
      </div>

      <div className="filter-group">
        <h4>Время отправления</h4>
        <div className="time-range">
          <input
            type="time"
            value={filters.departureStart}
            onChange={(e) => handleChange("departureStart", e.target.value)}
          />
          <span>-</span>
          <input
            type="time"
            value={filters.departureEnd}
            onChange={(e) => handleChange("departureEnd", e.target.value)}
          />
        </div>
      </div>

      <div className="filter-group">
        <h4>Тип поезда</h4>
        {trainTypes.map((type) => (
          <label key={type.id} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.trainTypes.includes(type.id)}
              onChange={(e) =>
                handleCheckboxChange("trainTypes", type.id, e.target.checked)
              }
            />
            <span>{type.label}</span>
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Удобства</h4>
        {amenities.map((amenity) => (
          <label key={amenity.id} className="checkbox-label">
            <input
              type="checkbox"
              checked={filters.amenities.includes(amenity.id)}
              onChange={(e) =>
                handleCheckboxChange("amenities", amenity.id, e.target.checked)
              }
            />
            <span>{amenity.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
