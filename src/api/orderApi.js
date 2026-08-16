import api from "./axios";

export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

export const getOrders = async (page = 0, size = 10) => {
  const response = await api.get("/orders", {
    params: {
      page,
      size,
    },
  });

  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await api.post(`/orders/${id}/cancel`);
  return response.data;
};
