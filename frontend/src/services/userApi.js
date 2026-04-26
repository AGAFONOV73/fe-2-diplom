import { api } from "./api";
import { ENDPOINTS } from "./config";

export const userApi = {
  // Получить профиль
  getProfile: async () => {
    const response = await api.get(ENDPOINTS.USER);
    return response.data;
  },

  // Обновить профиль
  updateProfile: async (data) => {
    const response = await api.put(ENDPOINTS.USER, data);
    return response.data;
  },

  // Получить заказы пользователя
  getOrders: async () => {
    const response = await api.get(`${ENDPOINTS.USER}/orders`);
    return response.data;
  },
};
