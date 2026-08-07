import React, { createContext, useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from './AuthContext';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('trendkart_guest_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) {
      fetchUserWishlist();
    }
  }, [user]);

  const fetchUserWishlist = async () => {
    try {
      const res = await API.get('/wishlist');
      if (res.data && res.data.products) {
        setWishlistItems(res.data.products);
      }
    } catch (error) {
      console.log('Wishlist fetch error', error);
    }
  };

  useEffect(() => {
    if (!user) {
      localStorage.setItem('trendkart_guest_wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, user]);

  const toggleWishlist = async (product) => {
    const exists = wishlistItems.some(item => item._id === product._id);
    if (exists) {
      setWishlistItems(prev => prev.filter(item => item._id !== product._id));
    } else {
      setWishlistItems(prev => [...prev, product]);
    }

    if (user) {
      try {
        await API.post('/wishlist/toggle', { productId: product._id });
      } catch (err) {
        console.log('Wishlist toggle error', err);
      }
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item._id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlistItems.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
