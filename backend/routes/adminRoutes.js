import express from 'express';
import { getAdminStats } from '../controllers/adminController.js';
import { getAllReviews, deleteReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/stats', protect, admin, getAdminStats);
router.get('/reviews', protect, admin, getAllReviews);
router.delete('/reviews/:id', protect, admin, deleteReview);

export default router;
