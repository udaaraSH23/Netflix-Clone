const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strict', false);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to Database ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

module.exports = connectDB;