import express from 'express';
import { getCart, addToCart, removeFromCart, clearCart } from '../controllers/cartController.js';
import { protect, optionalProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(optionalProtect, getCart).post(optionalProtect, addToCart).delete(optionalProtect, clearCart);
router.delete('/:productId', optionalProtect, removeFromCart);

export default router;
