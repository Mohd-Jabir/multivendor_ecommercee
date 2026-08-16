import api from "./axios";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data.data;
};
export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data.data;
};
