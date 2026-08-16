import { useMutation, useQuery } from "@tanstack/react-query";

import {
  getMyPayments,
  getPaymentByOrderId,
  initiateCCAvenuePayment,
} from "../api/paymentApi";

export const useMyPayments = (params = {}) => {
  return useQuery({
    queryKey: ["payments", params],
    queryFn: () => getMyPayments(params),
  });
};

export const usePaymentByOrderId = (orderId) => {
  return useQuery({
    queryKey: ["payment", orderId],
    queryFn: () => getPaymentByOrderId(orderId),
    enabled: Boolean(orderId),
  });
};

export const useInitiateCCAvenuePayment = () => {
  return useMutation({
    mutationFn: initiateCCAvenuePayment,
  });
};
