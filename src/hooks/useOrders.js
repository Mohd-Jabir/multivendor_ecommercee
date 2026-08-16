import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
} from "../api/orderApi.js";

export const useOrders = (page = 0, size = 10) => {
  return useQuery({
    queryKey: ["orders", { page, size }],
    queryFn: () => getOrders(page, size),
  });
};
export const useOrder = (id) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id),
    enabled: Boolean(id),
  });
};
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["order", orderId],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};
