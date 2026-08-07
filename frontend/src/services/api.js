import axios from 'axios';

// Get API base URL from environment variable VITE_API_URL or fallback to Render backend
const rawApiUrl = import.meta.env.VITE_API_URL || 'https://onlineshop1-c5m4.onrender.com/api';
const baseURL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`;

const API = axios.create({
  baseURL,
});

// Request Interceptor
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('trendkart_user') || 'null');
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

// Helper for formatting image URLs (e.g. /uploads/... from Render backend)
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (typeof imagePath !== 'string') return imagePath;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  const cleanBackend = baseURL.replace(/\/api\/?$/, '').replace(/\/$/, '');
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${cleanBackend}${cleanPath}`;
};

export default API;

