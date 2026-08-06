import express from 'express';
import {
  getProducts,
  getProductById,
  getShowcaseProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { getProductReviews, createProductReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/showcase/sections', getShowcaseProducts);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

// Reviews sub-routes
router.route('/:productId/reviews').get(getProductReviews).post(protect, createProductReview);

export default router;
