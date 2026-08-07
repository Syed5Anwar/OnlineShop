import axios from 'axios';

// When frontend and backend are merged on Vercel, API calls use relative '/api'
const rawApiUrl = import.meta.env.VITE_API_URL || '/api';
const baseURL = rawApiUrl ? (rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`) : '/api';

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

// Helper for formatting image URLs
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (typeof imagePath !== 'string') return imagePath;
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('data:')) {
    return imagePath;
  }
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return cleanPath;
};

export default API;

