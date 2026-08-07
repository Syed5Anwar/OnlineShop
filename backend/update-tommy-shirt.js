import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

const updateTommyShirt = async () => {
  try {
    await connectDB();

    // Update the Tommy Hilfiger Oxford Solid Slim Fit Shirt product
    const result = await Product.updateOne(
      { name: 'Tommy Hilfiger Oxford Solid Slim Fit Shirt' },
      {
        $set: {
          name: "Men's Casual Button-Down Shirt Jacket, Khaki, Long Sleeve, Dual Chest Pockets, Relaxed Fit Shacket",
          description: 'Elevate your casual wardrobe with this pure cotton Oxford shirt with signature brand flag embroidery.',
          images: [
            'https://m.media-amazon.com/images/I/31MT8v6VAIL._SS64_.jpg'
          ],
        },
      }
    );

    console.log('Update result:', result);

    const updated = await Product.findOne({ name: "Men's Casual Button-Down Shirt Jacket, Khaki, Long Sleeve, Dual Chest Pockets, Relaxed Fit Shacket" });
    if (updated) {
      console.log('Updated product:', updated.name);
      console.log('Brand:', updated.brand);
      console.log('Price:', updated.price);
      console.log('Image:', updated.images[0]);
    } else {
      console.log('Product not found after update. Check if the original product name exists in the database.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Update failed:', error.message);
    process.exit(1);
  }
};

updateTommyShirt();