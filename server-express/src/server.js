require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandle');
const { mongo } = require('mongoose');

const app = express();
connectDB();

// Middleware
app.use(express.json());

// Default Route

app.get('/', (req, res) => {
  res.send('Welcome to the Express Server');
});

// Routes
app.use('/api', require('./routes/routes'));

// Error Handling Middleware
app.use(errorHandler);

// Server Start
const port = process.env.PORT || 4444;
app.listen(port, () => console.log(`Server is running on port ${port}`));

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await mongoose.connection.close();
  process.exit(0);
});
