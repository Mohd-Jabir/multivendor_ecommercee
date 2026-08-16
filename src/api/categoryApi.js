import api from "./axios";

export const getCategories = async (topLevelOnly = false) => {
  const response = await api.get("/categories", {
    params: {
      topLevelOnly,
    },
  });
console.log("Categories:", response);
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};
