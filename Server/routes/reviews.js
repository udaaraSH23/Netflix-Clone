const express = require('express');
const Review = require('../models/reviewModel');
const auth = require('../middleware/auth');
const router = express.Router();

// GET all reviews
router.get('/',auth, async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// GET a specific review by ID
router.get('/:id',auth, async (req, res) => {
    try {
        const reviewId = req.params.id;
        const review = await Review.findById(reviewId);

        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.json(review);
    } catch (error) {
        console.error('Error getting review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// POST a new review
router.post('/',auth, async (req, res) => {
    try {
        const { userId, contentId, contentType, rating, comment } = req.body;

        // Create a new review
        const newReview = new Review({
            userId,
            contentId,
            contentType,
            rating,
            comment
        });

        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// PUT/update an existing review
router.put('/:id',auth, async (req, res) => {
    try {
        const reviewId = req.params.id;
        const updatedData = req.body;

        // Update the review
        const updatedReview = await Review.findByIdAndUpdate(reviewId, updatedData, { new: true, runValidators: true });

        if (!updatedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.json(updatedReview);
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// DELETE a review
router.delete('/:id',auth, async (req, res) => {
    try {
        const reviewId = req.params.id;

        // Delete the review
        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return res.status(404).json({ error: 'Review not found' });
        }

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;