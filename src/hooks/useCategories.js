import { getCategories, getCategoryById } from "../api/categoryApi.js";
import { useQuery } from "@tanstack/react-query";

export const useCategories = (topLevelOnly = false) => {
  return useQuery({
    queryKey: ["categories", { topLevelOnly }],
    queryFn: () => getCategories(topLevelOnly),
  });
};

export const useCategory = (id) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id),
    enabled: Boolean(id),
  });
};
