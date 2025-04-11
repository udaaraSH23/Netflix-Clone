import express from 'express';
import * as reviewController from '../controller/reviewController';

const router = express.Router();

router.get('/', reviewController.getAllReviews);
router.get('/:id',reviewController.getReviewById);
router.post('/', reviewController.createReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

export default router;