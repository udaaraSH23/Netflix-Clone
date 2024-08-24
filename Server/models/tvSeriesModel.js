const mongoose = require('mongoose');

// Define the TV series schema
const tvSeriesSchema = new mongoose.Schema({
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
        type: Number, // Rating is stored as a floating-point number
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
        type: Number, // Year is stored as a number
        required: true
    }
});


const TVSeries = mongoose.model('TVSeries', tvSeriesSchema);

module.exports = TVSeries;
