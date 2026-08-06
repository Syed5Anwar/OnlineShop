import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51MockStripeSecretKey1234567890');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      discountAmount,
      totalAmount,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      discountAmount,
      totalAmount,
      isPaid: paymentMethod === 'Stripe' ? true : false,
      paidAt: paymentMethod === 'Stripe' ? new Date() : null,
      orderStatus: 'Processing',
      deliveryStatus: 'Order placed successfully. Preparing for dispatch.',
    });

    const createdOrder = await order.save();

    // Reduce stock quantities
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stockQuantity = Math.max(0, product.stockQuantity - item.quantity);
        await product.save();
      }
    }

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create Stripe PaymentIntent
// @route   POST /api/orders/create-payment-intent
// @access  Private
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    // Simulated / Live Stripe Payment Intent
    let clientSecret = 'mock_client_secret_' + Math.random().toString(36).substring(7);
    try {
      if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('Mock')) {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100), // Stripe takes amounts in cents/paise
          currency: 'inr',
          payment_method_types: ['card'],
        });
        clientSecret = paymentIntent.client_secret;
      }
    } catch (e) {
      console.log('Using simulated Stripe payment intent for demo mode.');
    }

    res.json({ clientSecret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email mobile');

    if (order) {
      // Allow only the order owner or Admin to view
      if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Not authorized to view this order' });
      }
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel order (User)
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Not authorized to cancel this order' });
      }

      if (order.orderStatus === 'Delivered') {
        return res.status(400).json({ message: 'Delivered orders cannot be cancelled' });
      }

      order.orderStatus = 'Cancelled';
      order.deliveryStatus = 'Order has been cancelled by customer.';
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, deliveryStatus } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
      order.orderStatus = orderStatus || order.orderStatus;
      if (deliveryStatus) {
        order.deliveryStatus = deliveryStatus;
      } else {
        if (orderStatus === 'Shipped') order.deliveryStatus = 'Dispatched from hub. In transit.';
        if (orderStatus === 'Delivered') {
          order.deliveryStatus = 'Package delivered successfully.';
          order.isPaid = true;
          order.paidAt = new Date();
          order.deliveredAt = new Date();
        }
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
