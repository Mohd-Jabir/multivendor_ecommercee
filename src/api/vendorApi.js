import api from "./axios";
export const createVendorStore = async (storeData) => {
  const response = await api.post("/vendor/store", storeData);
  return response.data;
};

export const getVendorStore = async () => {
  try {
    const response = await api.get("/vendor/store");
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const updateVendorStore = async (storeData) => {
  const response = await api.put("/vendor/store", storeData);
  return response.data;
};
export const createVendorProduct = async (productData) => {
  const response = await api.post("/vendor/products", productData);
  return response.data;
};

export const getVendorProducts = async (params = {}) => {
  const response = await api.get("/vendor/products", {
    params,
  });
  return response.data;
};

export const updateVendorProduct = async (productId, productData) => {
  const response = await api.put(`/vendor/products/${productId}`, productData);
  return response.data;
};

export const deleteVendorProduct = async (productId) => {
  const response = await api.delete(`/vendor/products/${productId}`);
  return response.data;
};

export const updateVendorProductStock = async (productId, stock) => {
  const response = await api.patch(`/vendor/products/${productId}/stock`, {
    stock,
  });
  return response.data;
};
export const getVendorOrders = async (params = {}) => {
  const response = await api.get("/vendor/orders", {
    params,
  });

  return response.data;
};

export const updateVendorOrderItemStatus = async (orderItemId, status) => {
  const response = await api.patch(
    `/vendor/orders/items/${orderItemId}/status`,
    {
      status,
    },
  );
  return response.data;
};
