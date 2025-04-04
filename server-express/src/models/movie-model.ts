import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the Movie model
export interface IMovie extends Document {
  id: number;
  name: string;
  description: string;
  rating: number;
  category: string;
  posterUrl: string;
  backdropUrl: string;
  videoUrl: string;
  year: number;
}

// Define the Movie schema
const movieSchema: Schema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number, // Rating is typically a number, so we'll store it as a Number
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    posterUrl: {
      type: String,
      required: true,
    },
    backdropUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    year: {
      type: Number, // Year is typically stored as a number
      required: true,
    },
  },
  {
    timestamps: true, // Optional: Adds createdAt and updatedAt fields automatically
  }
);

// Create the model based on the interface and schema
const Movie = mongoose.model<IMovie>('Movie', movieSchema);

export default Movie;
