import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the User document
interface User extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  role: 'user' | 'admin';
  movies: {
    watched: mongoose.Types.ObjectId[];
    watching: mongoose.Types.ObjectId[];
    toBeWatched: mongoose.Types.ObjectId[];
  };
}

// Define the User schema
const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    movies: {
      watched: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
      watching: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
      toBeWatched: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

// Create the User model
const User = mongoose.model<User>('User', UserSchema);

export default User;
