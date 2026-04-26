import { api } from "./api";
import { ENDPOINTS } from "./config";

export const paymentApi = {
  // Создать платеж
  createPayment: async (data) => {
    const response = await api.post(ENDPOINTS.PAYMENT, data);
    return response.data;
  },

  // Проверить статус платежа
  checkStatus: async (paymentId) => {
    const response = await api.get(`${ENDPOINTS.PAYMENT}/${paymentId}`);
    return response.data;
  },
};
