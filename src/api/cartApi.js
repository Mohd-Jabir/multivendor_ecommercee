import api from "./axios";

export const getCart = async () => {
  const response = await api.get("/cart");
  return response.data;
};
export const addCartItem = async (cartItemData) => {
  const response = await api.post("/cart/items", cartItemData);
  return response.data;
};

export const updateCartItem = async (cartItemId, data) => {
  const response = await api.patch(`/cart/items/${cartItemId}`, data);
  return response.data;
};

export const removeCartItem = async (cartItemId) => {
  const response = await api.delete(`/cart/items/${cartItemId}`);
  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete("/cart");
  return response.data;
};
