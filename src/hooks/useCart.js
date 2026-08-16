import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../api/cartApi.js";
const CART_QUERY_KEY = ["cart"];
export const useCart = () => {
  return useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: getCart,
  });
};
export const useAddCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CART_QUERY_KEY,
      });
    },
  });
};
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cartItemId, data }) =>
      updateCartItem(cartItemId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CART_QUERY_KEY,
      });
    },
  });
};
export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CART_QUERY_KEY,
      });
    },
  });
};
export const useClearCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CART_QUERY_KEY,
      });
    },
  });
};
