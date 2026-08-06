import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('trendkart_guest_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [coupon, setCoupon] = useState(null);

  // Sync cart with backend if logged in
  useEffect(() => {
    if (user) {
      fetchUserCart();
    }
  }, [user]);

  const fetchUserCart = async () => {
    try {
      const res = await axios.get('/api/cart');
      if (res.data && res.data.items) {
        const formattedItems = res.data.items
          .filter(item => item.product)
          .map(item => ({
            product: item.product,
            quantity: item.quantity,
          }));
        setCartItems(formattedItems);
      }
    } catch (error) {
      console.log('Error fetching cart:', error);
    }
  };

  // Save guest cart to localStorage
  useEffect(() => {
    if (!user) {
      localStorage.setItem('trendkart_guest_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, user]);

  const addToCart = async (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product._id === product._id);
      if (existing) {
        return prev.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    if (user) {
      try {
        const existing = cartItems.find(item => item.product._id === product._id);
        const newQty = existing ? existing.quantity + quantity : quantity;
        await axios.post('/api/cart', { productId: product._id, quantity: newQty });
      } catch (err) {
        console.log('API Cart error', err);
      }
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );

    if (user) {
      try {
        await axios.post('/api/cart', { productId, quantity });
      } catch (err) {
        console.log('API Cart qty error', err);
      }
    }
  };

  const removeFromCart = async (productId) => {
    setCartItems(prev => prev.filter(item => item.product._id !== productId));
    if (user) {
      try {
        await axios.delete(`/api/cart/${productId}`);
      } catch (err) {
        console.log('API Cart remove error', err);
      }
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    setCoupon(null);
    if (!user) {
      localStorage.removeItem('trendkart_guest_cart');
    } else {
      try {
        await axios.delete('/api/cart');
      } catch (err) {
        console.log('API Cart clear error', err);
      }
    }
  };

  // Price calculations
  const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const itemsPrice = cartItems.reduce((acc, item) => {
    const pPrice = item.product.discountPrice || item.product.price;
    return acc + pPrice * item.quantity;
  }, 0);

  const taxPrice = Math.round(itemsPrice * 0.18); // 18% GST
  const shippingPrice = itemsPrice > 1000 || itemsCount === 0 ? 0 : 99; // Free shipping over ₹1000
  const discountAmount = coupon ? coupon.discountAmount : 0;
  const totalAmount = Math.max(0, itemsPrice + taxPrice + shippingPrice - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        coupon,
        setCoupon,
        itemsCount,
        itemsPrice,
        taxPrice,
        shippingPrice,
        discountAmount,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
