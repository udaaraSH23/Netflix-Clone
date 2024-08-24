const mongoose = require('mongoose');

// Define the Review schema
const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contentId: {
        type: Number, 
        required: true
    },
    contentType: {
        type: String, 
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Review model
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
