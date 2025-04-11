import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the interface for the Review document
export interface IReview extends Document {
    userId: mongoose.Types.ObjectId;
    contentId: number;
    contentType: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

// Define the Review schema
const reviewSchema: Schema<IReview> = new mongoose.Schema({
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
const Review: Model<IReview> = mongoose.model<IReview>('Review', reviewSchema);

export default Review;