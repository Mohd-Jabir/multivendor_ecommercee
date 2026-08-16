import api from "./axios";
export const getMyPayments = async (params = {}) => {
  const response = await api.get("/payments/my", {
    params,
  });
  return response.data;
};

export const getPaymentByOrderId = async (orderId) => {
  const response = await api.get(`/payments/order/${orderId}`);
  return response.data;
};

export const initiateCCAvenuePayment = async (orderId) => {
  const response = await api.post(`/payments/ccavenue/initiate/${orderId}`);
  return response.data;
};
