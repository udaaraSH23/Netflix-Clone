import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from './logger';

// Load environment variables from .env file
dotenv.config();

// Define the database connection function
const connectDB = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', false);  
    
    // Make sure MONGO_URI is defined in the .env file
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {});

    logger.info(`Connected to Database ${conn.connection.host}`);
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process if the connection fails
  }
}

// Export the connection function for use in other files
export default connectDB;
