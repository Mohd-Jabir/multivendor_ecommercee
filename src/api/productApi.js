import api from "./axios";

export const getProducts = async (params = {}) => {
  const response = await api.get("/products", { params });
  return response.data;
};
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
