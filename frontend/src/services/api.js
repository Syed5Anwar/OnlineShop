import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Request Interceptor
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('trendkart_user') || 'null');
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default API;
