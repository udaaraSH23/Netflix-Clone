import mongoose, { Document, Schema } from 'mongoose';

// Define the interface for the TVSeries model
export interface ITvSeries extends Document {
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

// Define the TV series schema
const tvSeriesSchema: Schema = new Schema(
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
      type: Number, // Rating is stored as a floating-point number
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
      type: Number, // Year is stored as a number
      required: true,
    },
  },
  {
    timestamps: true, // Optional: Adds createdAt and updatedAt fields
  }
);

// Create the model based on the interface and schema
const TVSeries = mongoose.model<ITvSeries>('TVSeries', tvSeriesSchema);

export default TVSeries;
