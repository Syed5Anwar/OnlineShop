import API from './api';

export const fetchProducts = async (params = {}) => {
  const response = await API.get('/products', { params });
  return response.data;
};

export const fetchProductDetails = async (id) => {
  const response = await API.get(`/products/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await API.get('/categories');
  return response.data;
};

export const fetchShowcaseSections = async () => {
  const response = await API.get('/products/showcase/sections');
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await API.post('/products', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await API.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await API.delete(`/products/${id}`);
  return response.data;
};

export const addReview = async (productId, reviewData) => {
  const response = await API.post(`/products/${productId}/reviews`, reviewData);
  return response.data;
};
