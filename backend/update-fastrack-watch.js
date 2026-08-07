import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

const updateFastrackWatch = async () => {
  try {
    await connectDB();

    // Update the Fossil Gen 6 Touchscreen Smartwatch product
    const result = await Product.updateOne(
      { name: 'Fossil Gen 6 Touchscreen Smartwatch' },
      {
        $set: {
          name: 'Fastrack Gelato Quartz Analog with Chronograph Watch for Guys',
          brand: 'Fastrack',
          description: 'Stylish Fastrack Gelato quartz analog watch with chronograph function. Perfect blend of classic design and modern style for men.',
          price: 2000,
          discountPrice: 1180,
          discountPercentage: 41,
          images: [
            'https://m.media-amazon.com/images/I/71tNejUr6lL._SX679_.jpg'
          ],
          specifications: [
            { key: 'Movement', value: 'Quartz Analog' },
            { key: 'Feature', value: 'Chronograph' },
            { key: 'Water Resistance', value: '3 ATM' }
          ],
        },
      }
    );

    console.log('Update result:', result);

    const updated = await Product.findOne({ name: 'Fastrack Gelato Quartz Analog with Chronograph Watch for Guys' });
    if (updated) {
      console.log('Updated product:', updated.name);
      console.log('Brand:', updated.brand);
      console.log('Price:', updated.price);
      console.log('Discount Price:', updated.discountPrice);
      console.log('Discount %:', updated.discountPercentage);
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

updateFastrackWatch();