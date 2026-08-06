import API from './api';

export const fetchAdminStats = async () => {
  const response = await API.get('/admin/stats');
  return response.data;
};

export const fetchAllOrders = async () => {
  const response = await API.get('/orders');
  return response.data;
};

export const updateOrderStatus = async (id, statusData) => {
  const response = await API.put(`/orders/${id}/status`, statusData);
  return response.data;
};

export const fetchAllUsers = async () => {
  const response = await API.get('/users');
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await API.delete(`/users/${id}`);
  return response.data;
};

export const updateUserRole = async (id, roleData) => {
  const response = await API.put(`/users/${id}`, roleData);
  return response.data;
};

export const fetchAllReviews = async () => {
  const response = await API.get('/admin/reviews');
  return response.data;
};

export const deleteReview = async (id) => {
  const response = await API.delete(`/admin/reviews/${id}`);
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await API.post('/categories', categoryData);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await API.delete(`/categories/${id}`);
  return response.data;
};
