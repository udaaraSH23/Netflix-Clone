require('dotenv').config();



const express = require('express');
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// MongoDB connection setup

const connectDB = require('./config/db');
connectDB();




// Routes

app.get('/', (req, res) => {
  res.send('Welcome to the Movies API!');
});

// Auth Routes
const authRoutes = require('./routes/auth.js');
app.use('/api/auth', authRoutes);

//Movie Routes
const movieRoutes = require('./routes/movies.js');
app.use('/api/movies', movieRoutes);

//TvSeries Route

const TvSeriesRoutes = require('./routes/tvSeries.js');
app.use('/api/tvSeries', TvSeriesRoutes);

//User Routes

const userRoutes = require('./routes/users.js');
app.use('/api/users', userRoutes);

//Review Routes

const reviewRoutes = require('./routes/reviews.js');
app.use('/api/reviews', reviewRoutes);




// Get the port from environment variables or use the default
const port = process.env.PORT || 4444;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
