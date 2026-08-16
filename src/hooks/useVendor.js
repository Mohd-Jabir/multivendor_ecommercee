import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createVendorStore,
  getVendorStore,
  updateVendorStore,
  createVendorProduct,
  getVendorProducts,
  updateVendorProduct,
  deleteVendorProduct,
  updateVendorProductStock,
  getVendorOrders,
  updateVendorOrderItemStatus,
} from "../api/vendorApi.js";
export const useVendorStore = () => {
  return useQuery({
    queryKey: ["vendor", "store"],
    queryFn: getVendorStore,
  });
};
export const useCreateVendorStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVendorStore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor", "store"],
      });
    },
  });
};

export const useUpdateVendorStore = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateVendorStore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor", "store"],
      });
    },
  });
};

export const useVendorProducts = (params = {}) => {
  return useQuery({
    queryKey: ["vendor", "products", params],
    queryFn: () => getVendorProducts(params),
  });
};

export const useCreateVendorProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createVendorProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor", "products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
export const useUpdateVendorProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, productData }) =>
      updateVendorProduct(productId, productData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor", "products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useDeleteVendorProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteVendorProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor", "products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};

export const useUpdateVendorProductStock = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, stock }) =>
      updateVendorProductStock(productId, stock),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor", "products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
export const useVendorOrders = (params = {}) => {
  return useQuery({
    queryKey: ["vendor", "orders", params],
    queryFn: () => getVendorOrders(params),
  });
};

export const useUpdateVendorOrderItemStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderItemId, status }) =>
      updateVendorOrderItemStatus(orderItemId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vendor", "orders"],
      });
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
};
