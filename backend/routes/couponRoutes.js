import express from 'express';
import { validateCoupon, getCoupons, createCoupon } from '../controllers/couponController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/validate', validateCoupon);
router.route('/').get(protect, admin, getCoupons).post(protect, admin, createCoupon);

export default router;
