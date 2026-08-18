import api from "./axios";
export const getCategories = async (topLevelOnly = false) => {
  const response = await api.get("/categories", {
    params: {
      topLevelOnly,
    },
  });
  return response.data.data || [];
};
export const getCategoryById = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data.data || response.data;
};
