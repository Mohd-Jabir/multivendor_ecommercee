import api from "./axios";

export const getPendingVendors = async () => {
  const response = await api.get("/admin/vendors/pending");
  return response.data;
};

export const getApprovedVendors = async () => {
  const response = await api.get("/admin/vendors/approved");
  return response.data;
};

export const approveVendor = async (vendorId) => {
  const response = await api.post(`/admin/vendors/${vendorId}/approve`);
  return response.data;
};

export const rejectVendor = async (vendorId) => {
  const response = await api.post(`/admin/vendors/${vendorId}/reject`);

  return response.data;
};
export const createAdminCategory = async (categoryData) => {
  const response = await api.post("/admin/categories", categoryData);
  return response.data;
};
export const updateAdminCategory = async (id, categoryData) => {
  const response = await api.put(`/admin/categories/${id}`, categoryData);
  return response.data;
};

export const deleteAdminCategory = async (id) => {
  const response = await api.delete(`/admin/categories/${id}`);
  return response.data;
};

export const getAdminOrders = async (params = {}) => {
  const response = await api.get("/admin/orders", {
    params,
  });

  return response.data;
};
