import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../api/addressApi";

const ADDRESS_QUERY_KEY = ["addresses"];
export const useAddresses = () => {
  return useQuery({
    queryKey: ADDRESS_QUERY_KEY,
    queryFn: getAddresses,
  });
};
export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADDRESS_QUERY_KEY,
      });
    },
  });
};
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, addressData }) => updateAddress(id, addressData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADDRESS_QUERY_KEY,
      });
    },
  });
};
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ADDRESS_QUERY_KEY,
      });
    },
  });
};
