import express from 'express';
import {
  addOrderItems,
  createPaymentIntent,
  getOrderById,
  getMyOrders,
  cancelOrder,
  getOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.post('/create-payment-intent', protect, createPaymentIntent);
router.get('/my-orders', protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.put('/:id/cancel', protect, cancelOrder);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
