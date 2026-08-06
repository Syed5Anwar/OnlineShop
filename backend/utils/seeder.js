import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Coupon from '../models/Coupon.js';
import Review from '../models/Review.js';
import Order from '../models/Order.js';
import Wishlist from '../models/Wishlist.js';
import Cart from '../models/Cart.js';
import { categoriesData, productsData, couponsData } from './seedData.js';
import connectDB from '../config/db.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    console.log('Clearing existing database collections...');
    await Category.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Coupon.deleteMany();
    await Review.deleteMany();
    await Order.deleteMany();
    await Wishlist.deleteMany();
    await Cart.deleteMany();

    console.log('Seeding Categories (10 Categories)...');
    const createdCategories = await Category.insertMany(categoriesData);

    console.log('Seeding Users...');
    const adminUser = await User.create({
      name: 'Trendkart Admin',
      email: 'admin@trendkart.com',
      password: 'admin123',
      mobile: '+91 9876543210',
      role: 'ADMIN',
      address: {
        street: '123 Tech Park',
        city: 'Bengaluru',
        state: 'Karnataka',
        zipCode: '560001',
        country: 'India',
      },
    });

    const demoUser = await User.create({
      name: 'John Doe',
      email: 'user@trendkart.com',
      password: 'user123',
      mobile: '+91 9123456789',
      role: 'USER',
      address: {
        street: '45 MG Road',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
        country: 'India',
      },
    });

    console.log('Seeding Products (70+ Products)...');
    const sampleProducts = productsData.map((product) => {
      return { ...product };
    });
    const createdProducts = await Product.insertMany(sampleProducts);

    console.log('Seeding Coupons...');
    await Coupon.insertMany(couponsData);

    console.log('Seeding Sample Order & Reviews...');
    const firstProduct = createdProducts[0];
    await Review.create({
      user: demoUser._id,
      userName: demoUser.name,
      product: firstProduct._id,
      rating: 5,
      title: 'Absolutely astounding quality!',
      comment: 'The noise cancellation on these headphones is out of this world. Super fast delivery from Trendkart.',
    });

    await Order.create({
      user: demoUser._id,
      orderItems: [
        {
          name: firstProduct.name,
          quantity: 1,
          image: firstProduct.images[0],
          price: firstProduct.discountPrice || firstProduct.price,
          product: firstProduct._id,
        },
      ],
      shippingAddress: {
        fullName: demoUser.name,
        mobile: demoUser.mobile,
        street: demoUser.address.street,
        city: demoUser.address.city,
        state: demoUser.address.state,
        zipCode: demoUser.address.zipCode,
        country: demoUser.address.country,
      },
      paymentMethod: 'COD',
      itemsPrice: firstProduct.discountPrice || firstProduct.price,
      taxPrice: Math.round((firstProduct.discountPrice || firstProduct.price) * 0.18),
      shippingPrice: 0,
      discountAmount: 0,
      totalAmount: Math.round((firstProduct.discountPrice || firstProduct.price) * 1.18),
      isPaid: true,
      paidAt: new Date(),
      orderStatus: 'Delivered',
      deliveryStatus: 'Delivered to recipient',
    });

    console.log(`========================================`);
    console.log(`DATA SEEDING SUCCESSFUL!`);
    console.log(`- Categories Seeded: ${createdCategories.length}`);
    console.log(`- Products Seeded: ${createdProducts.length}`);
    console.log(`- Admin Credentials: admin@trendkart.com / admin123`);
    console.log(`- User Credentials: user@trendkart.com / user123`);
    console.log(`========================================`);

    process.exit(0);
  } catch (error) {
    console.error(`Seeding Failed: ${error.message}`);
    process.exit(1);
  }
};

importData();
