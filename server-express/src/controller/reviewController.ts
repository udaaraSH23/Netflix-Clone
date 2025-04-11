import { Request, Response } from 'express';
import * as reviewService from '../services/review-service';
import { ReviewNotFoundError } from '../Exceptions/review-error';

export const getAllReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await reviewService.getAllReviews();
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getReviewById = async (req: Request, res: Response) => {
    try {
        const reviewId = req.params.id;
        const review = await reviewService.getReviewById(reviewId);

        if (!review) {
            throw new ReviewNotFoundError('Review not found');
        }

        res.json(review);
    } catch (error) {
        if (error instanceof ReviewNotFoundError) {
            res.status(404).json({ error: error.message });
        } else {
            console.error('Error getting review:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export const createReview = async (req: Request, res: Response) => {
    try {
        const reviewData = req.body;
        const newReview = await reviewService.createReview(reviewData);
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateReview = async (req: Request, res: Response) => {
    try {
        const reviewId = req.params.id;
        const updatedData = req.body;
        const updatedReview = await reviewService.updateReview(reviewId, updatedData);

        if (!updatedReview) {
            throw new ReviewNotFoundError('Review not found');
        }

        res.json(updatedReview);
    } catch (error) {
        if (error instanceof ReviewNotFoundError) {
            res.status(404).json({ error: error.message });
        } else {
            console.error('Error updating review:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export const deleteReview = async (req: Request, res: Response) => {
    try {
        const reviewId = req.params.id;
        const deletedReview = await reviewService.deleteReview(reviewId);

        if (!deletedReview) {
            throw new ReviewNotFoundError('Review not found');
        }

        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        if (error instanceof ReviewNotFoundError) {
            res.status(404).json({ error: error.message });
        } else {
            console.error('Error deleting review:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};
