import mongoose from 'mongoose';
import dns from 'dns';

// Ensure DNS resolution succeeds on Windows for MongoDB Atlas SRV URIs
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  // Ignore DNS override errors if restricted
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/trendkart', {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Warning/Error: ${error.message}`);
    console.log('Ensure MongoDB service is running locally or provide a valid MONGO_URI in backend/.env');
  }
};

export default connectDB;

