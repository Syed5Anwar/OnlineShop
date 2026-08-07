import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import connectDB from './config/db.js';

dotenv.config();

const updateStoodSunglasses = async () => {
  try {
    await connectDB();

    // Update the Ray-Ban Aviator Classic Sunglasses product
    const result = await Product.updateOne(
      { name: 'Ray-Ban Aviator Classic Sunglasses' },
      {
        $set: {
          name: 'Stood Soft Square Sunglasses | UV Protected | Polycarbonate | Shiny Finish | Unisex | SG-STD0024',
          brand: 'Stood',
          description: 'Stylish soft square sunglasses with UV protection and polycarbonate lenses. Shiny finish, perfect for both men and women.',
          price: 600,
          discountPrice: 414,
          discountPercentage: 31,
          images: [
            'https://m.media-amazon.com/images/I/61TIZif66IL._SX679_.jpg'
          ],
          specifications: [
            { key: 'Frame', value: 'Soft Square' },
            { key: 'Lens', value: 'Polycarbonate' },
            { key: 'UV Protection', value: 'UV Protected' },
            { key: 'Finish', value: 'Shiny Finish' }
          ],
        },
      }
    );

    console.log('Update result:', result);

    const updated = await Product.findOne({ name: 'Stood Soft Square Sunglasses | UV Protected | Polycarbonate | Shiny Finish | Unisex | SG-STD0024' });
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

updateStoodSunglasses();