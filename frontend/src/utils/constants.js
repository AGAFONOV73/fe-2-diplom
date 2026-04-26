export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  HOW_IT_WORKS: "/how-it-works",
  REVIEWS: "/reviews",
  SEARCH: "/search",
  LAST_TICKETS: "/last-tickets",
  TRAIN: "/train/:id",
  PASSENGER: "/passenger",
  PAYMENT: "/payment",
  CONFIRMATION: "/confirmation",
};

export const CITIES = [
  "Москва",
  "Санкт-Петербург",
  "Новосибирск",
  "Екатеринбург",
  "Казань",
  "Нижний Новгород",
  "Красноярск",
  "Челябинск",
  "Омск",
  "Самара",
  "Ростов-на-Дону",
  "Уфа",
  "Красноярск",
  "Пермь",
  "Воронеж",
];

export const DATE_FORMAT = "DD.MM.YYYY";
export const TIME_FORMAT = "HH:mm";

export const TRAIN_TYPES = {
  FAST: "Скорый",
  PASSENGER: "Пассажирский",
  EXPRESS: "Экспресс",
};

export const SEAT_TYPES = {
  LOWER: "Нижнее",
  UPPER: "Верхнее",
  SIDE: "Боковое",
};
