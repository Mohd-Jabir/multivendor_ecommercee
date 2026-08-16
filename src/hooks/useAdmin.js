import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { 
  getPendingVendors,
  getApprovedVendors,
  approveVendor,
  rejectVendor,
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
  getAdminOrders,
} from "../api/adminApi.js";

export const usePendingVendors = () => {
  return useQuery({
    queryKey: ["admin", "vendors", "pending"],
    queryFn: getPendingVendors,
  });
};
export const useApprovedVendors = () => {
  return useQuery({
    queryKey: ["admin", "vendors", "approved"],
    queryFn: getApprovedVendors,
  });
};
export const useApproveVendor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "vendors"],
      });
      queryClient.invalidateQueries({
        queryKey: ["vendor", "store"],
      });
    },
  });
};
export const useRejectVendor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectVendor,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "vendors"],
      });
    },
  });
};
export const useCreateAdminCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAdminCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};
export const useUpdateAdminCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, categoryData }) =>
      updateAdminCategory(
        id,
        categoryData
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};
export const useDeleteAdminCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdminCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};
export const useAdminOrders = (
  params = {}
) => {
  return useQuery({
    queryKey: ["admin", "orders", params],
    queryFn: () => getAdminOrders(params),
  });
};
