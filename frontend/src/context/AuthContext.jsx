import React, { createContext, useState } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('trendkart_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      setUser(res.data);
      localStorage.setItem('trendkart_user', JSON.stringify(res.data));
      setLoading(false);
      return { success: true, data: res.data };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (name, email, password, mobile) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/register', { name, email, password, mobile });
      setUser(res.data);
      localStorage.setItem('trendkart_user', JSON.stringify(res.data));
      setLoading(false);
      return { success: true, data: res.data };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('trendkart_user');
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    try {
      const res = await API.put('/auth/profile', profileData);
      setUser(res.data);
      localStorage.setItem('trendkart_user', JSON.stringify(res.data));
      setLoading(false);
      return { success: true, data: res.data };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        message: error.response?.data?.message || 'Update failed',
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
        isAdmin: user?.role === 'ADMIN',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
