const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number, // Rating is typically a number, so we'll store it as a Number
        required: true
    },
    category: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    backdropUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
    year: {
        type: Number, // Year is typically stored as a number
        required: true
    }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;