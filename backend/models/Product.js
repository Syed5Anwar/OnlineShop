import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'Please enter product brand'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please enter product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      default: 0.0,
    },
    discountPrice: {
      type: Number,
      default: 0.0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'Please select category'],
      enum: [
        'Electronics',
        'Fashion',
        'Beauty',
        'Home & Kitchen',
        'Grocery',
        'Mobiles',
        'Laptops',
        'Sports',
        'Furniture',
        'Toys',
      ],
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    stockQuantity: {
      type: Number,
      required: [true, 'Please enter product stock quantity'],
      default: 0,
    },
    specifications: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    isNewArrival: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: 'text', brand: 'text', description: 'text', category: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;
