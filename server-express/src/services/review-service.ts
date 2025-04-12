import Review from '../models/review-model';

// Service to fetch all reviews from the database
export const getAllReviews = async () => {
    return await Review.find();
};

// Service to fetch a specific review by its ID
export const getReviewById = async (id: string) => {
    return await Review.findById(id);
};

// Service to create a new review in the database
export const createReview = async (reviewData: any) => {
    const newReview = new Review(reviewData);
    return await newReview.save();
};

// Service to update an existing review by its ID
export const updateReview = async (id: string, updatedData: any) => {
    return await Review.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
};

// Service to delete a review by its ID
export const deleteReview = async (id: string) => {
    return await Review.findByIdAndDelete(id);
};
