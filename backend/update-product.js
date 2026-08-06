import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

const updateProduct = async () => {
  try {
    await connectDB();

    // Update Levis Men 511 Slim Fit Jeans product
    const result = await Product.updateOne(
      { name: 'Levis Men 511 Slim Fit Jeans' },
      {
        $set: {
          name: 'Levis Men and Women 511 Slim Fit Jeans',
          price: 780,
          discountPrice: 600.6,
          discountPercentage: 23,
        },
      }
    );

    console.log('Update result:', result);

    const updated = await Product.findOne({ name: 'Levis Men and Women 511 Slim Fit Jeans' });
    console.log('Updated product:', updated.name);
    console.log('Price:', updated.price);
    console.log('Discount Price:', updated.discountPrice);
    console.log('Discount %:', updated.discountPercentage);

    process.exit(0);
  } catch (error) {
    console.error('Update failed:', error.message);
    process.exit(1);
  }
};

updateProduct();