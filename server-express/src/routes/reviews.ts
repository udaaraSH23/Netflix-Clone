// Importing required modules and controllers
import express from 'express';
import * as reviewController from '../controller/reviewController';

const router = express.Router();

// Route to get all reviews
router.get('/', reviewController.getAllReviews);

// Route to get a specific review by ID
router.get('/:id', reviewController.getReviewById);

// Route to create a new review
router.post('/', reviewController.createReview);

// Route to update an existing review by ID
router.put('/:id', reviewController.updateReview);

// Route to delete a review by ID
router.delete('/:id', reviewController.deleteReview);

export default router;