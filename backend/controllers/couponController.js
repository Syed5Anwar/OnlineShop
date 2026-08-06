import Coupon from '../models/Coupon.js';

// @desc    Validate coupon code
// @route   POST /api/coupons/validate
// @access  Public
export const validateCoupon = async (req, res) => {
  try {
    const { code, cartTotal } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

    if (!coupon) {
      return res.status(404).json({ message: 'Invalid or expired coupon code' });
    }

    if (coupon.expiryDate < new Date()) {
      return res.status(400).json({ message: 'Coupon code has expired' });
    }

    if (cartTotal < coupon.minPurchaseAmount) {
      return res.status(400).json({
        message: `Minimum purchase of ₹${coupon.minPurchaseAmount} required for this coupon`,
      });
    }

    const calculatedDiscount = Math.round((cartTotal * coupon.discountPercentage) / 100);
    const discountAmount = Math.min(calculatedDiscount, coupon.maxDiscountAmount);

    res.json({
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
      discountAmount,
      message: `Coupon applied successfully! Saved ₹${discountAmount}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all coupons (Admin)
// @route   GET /api/coupons
// @access  Private/Admin
export const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create coupon (Admin)
// @route   POST /api/coupons
// @access  Private/Admin
export const createCoupon = async (req, res) => {
  try {
    const { code, discountPercentage, minPurchaseAmount, maxDiscountAmount, expiryDate } = req.body;

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountPercentage,
      minPurchaseAmount: minPurchaseAmount || 0,
      maxDiscountAmount: maxDiscountAmount || 1000,
      expiryDate: expiryDate || new Date('2028-12-31'),
    });

    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
