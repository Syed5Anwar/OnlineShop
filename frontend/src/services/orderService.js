import API from './api';

export const createOrder = async (orderData) => {
  const response = await API.post('/orders', orderData);
  return response.data;
};

export const fetchMyOrders = async () => {
  const response = await API.get('/orders/my-orders');
  return response.data;
};

export const fetchOrderDetails = async (id) => {
  const response = await API.get(`/orders/${id}`);
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await API.put(`/orders/${id}/cancel`);
  return response.data;
};

export const createPaymentIntent = async (amount) => {
  const response = await API.post('/orders/create-payment-intent', { amount });
  return response.data;
};

export const validateCoupon = async (code, cartTotal) => {
  const response = await API.post('/coupons/validate', { code, cartTotal });
  return response.data;
};
