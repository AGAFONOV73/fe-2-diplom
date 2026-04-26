import { api } from "./api";
import { ENDPOINTS } from "./config";

export const ticketsApi = {
  // Получить все билеты
  getAll: async () => {
    const response = await api.get(ENDPOINTS.TICKETS);
    return response.data;
  },

  // Получить билет по ID
  getById: async (id) => {
    const response = await api.get(`${ENDPOINTS.TICKETS}/${id}`);
    return response.data;
  },

  // Поиск билетов
  search: async (params) => {
    const response = await api.get(ENDPOINTS.SEARCH, { params });
    return response.data;
  },

  // Последние билеты
  getLastTickets: async () => {
    const response = await api.get(`${ENDPOINTS.TICKETS}/last`);
    return response.data;
  },

  // Забронировать билет
  book: async (ticketId, seatIds) => {
    const response = await api.post(`${ENDPOINTS.TICKETS}/${ticketId}/book`, {
      seatIds,
    });
    return response.data;
  },
};
