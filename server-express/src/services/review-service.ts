import Review from '../models/review-model';

export const getAllReviews = async () => {
    return await Review.find();
};

export const getReviewById = async (id: string) => {
    return await Review.findById(id);
};

export const createReview = async (reviewData: any) => {
    const newReview = new Review(reviewData);
    return await newReview.save();
};

export const updateReview = async (id: string, updatedData: any) => {
    return await Review.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
};

export const deleteReview = async (id: string) => {
    return await Review.findByIdAndDelete(id);
};
