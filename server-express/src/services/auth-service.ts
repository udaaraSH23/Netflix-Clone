// src/services/authService.ts
import bcrypt from 'bcrypt';
import User from '../models/user-model';
import {
  UserNotFoundException,
  InvalidCredentialsException,
  UserAlreadyExistException,
} from '../Exceptions/auth-error';

import { generateAccessToken, generateRefreshToken } from '../utils/jwtUtil';
import { Response } from 'express';

// Login user
export const loginUser = async (
  email: string,
  password: string,
  res: Response
) => {
  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) throw new UserNotFoundException('User not found');

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    throw new InvalidCredentialsException('Invalid email or password');

  // Generate JWT tokens
  const accessToken = generateAccessToken({
    id: user._id.toString(),
    role: user.role,
  });
  const refreshToken = generateRefreshToken({
    id: user._id.toString(),
    role: user.role,
  });

  // Set refresh token as an HTTP-only cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Secure in production
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return { message: 'Logged in successfully', accessToken };
};

// Register user
export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser)
    throw new UserAlreadyExistException('Email or username already exists');
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  // Save user
  const savedUser = await newUser.save();
  // Return user without password
  const { password: _, ...userWithoutPassword } = savedUser.toObject();
  // Return response
  return { message: 'User registered successfully', user: userWithoutPassword };
};

// Refresh access token
export const refreshAccessToken = async (
  user: { id: string; role: string }
): Promise<string | null> => {
  // Generate and return a new access token using the user info from the middleware
  const newAccessToken = generateAccessToken({
    id: user.id,
    role: user.role,
  });
  return newAccessToken;
};


