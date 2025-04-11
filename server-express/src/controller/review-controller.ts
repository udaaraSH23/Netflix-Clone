import { NextFunction, Request, Response } from 'express';
import * as reviewService from '../services/review-service';
import {
    ReviewNotFoundError,
    InvalidReviewIdError,
    ReviewCreationError,
    ReviewUpdateError,
    ReviewDeletionError
} from '../Exceptions/review-error';

// Utility: Validate and parse review ID
const parseReviewId = (id: string, next: NextFunction): string | undefined => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        next(new InvalidReviewIdError('Invalid review ID format'));
        return undefined;
    }
    return id;
};

// GET /reviews
export const getReviewsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const reviews = await reviewService.getAllReviews();
        res.json(reviews);
    } catch (error) {
        next(error);
    }
};

// GET /reviews/:id
export const getReviewByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const reviewId = parseReviewId(req.params.id, next);
    if (reviewId === undefined) return;

    try {
        const review = await reviewService.getReviewById(reviewId);
        if (!review) {
            return next(new ReviewNotFoundError('Review not found'));
        }
        res.json(review);
    } catch (error) {
        next(error);
    }
};

// POST /reviews
export const createReviewController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newReview = await reviewService.createReview(req.body);
        res.status(201).json(newReview);
    } catch (error) {
        next(new ReviewCreationError('Error creating review'));
    }
};

// PUT /reviews/:id
export const updateReviewController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const reviewId = parseReviewId(req.params.id, next);
    if (reviewId === undefined) return;

    try {
        const updatedReview = await reviewService.updateReview(reviewId, req.body);
        if (!updatedReview) {
            return next(new ReviewNotFoundError('Review not found'));
        }
        res.json(updatedReview);
    } catch (error) {
        next(new ReviewUpdateError('Error updating review'));
    }
};

// DELETE /reviews/:id
export const deleteReviewController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const reviewId = parseReviewId(req.params.id, next);
    if (reviewId === undefined) return;

    try {
        const deletedReview = await reviewService.deleteReview(reviewId);
        if (!deletedReview) {
            return next(new ReviewNotFoundError('Review not found'));
        }
        res.sendStatus(204);
    } catch (error) {
        next(new ReviewDeletionError('Error deleting review'));
    }
};
