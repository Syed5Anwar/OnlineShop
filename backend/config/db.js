import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/trendkart', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Warning/Error: ${error.message}`);
    console.log('Ensure MongoDB service is running locally on mongodb://localhost:27017/trendkart or provide a valid MONGO_URI in backend/.env');
  }
};

export default connectDB;
