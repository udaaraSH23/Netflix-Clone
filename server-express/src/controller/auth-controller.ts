// src/controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser,refreshAccessToken } from "../services/auth-service";
import { RegisterRequestBody } from "src/validations/authValidation";
import { AuthenticatedRequest } from "src/types/express";
import { InvalidUserDataError } from "../Exceptions/jwt-error";

//Login user
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
      const { email, password } = req.body;
      const response = await loginUser(email, password, res);
      res.json(response);
  } catch (error) {
      next(error); // Pass error to the error handler
  }
};

//Register user
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, password }:RegisterRequestBody = req.body;
    const response = await registerUser(username, email, password);
    res.status(201).json(response);
  } catch (error) {
    next(error);// Pass the error to the error handler
  }
};

//Get Refresh Token
export const refreshToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // The user data is available in `req.user` from the middleware
    const user = req.user;

    if (!user) {
      throw new InvalidUserDataError("Invalid user data");
    }

    // Call the service function to refresh the token using the decoded user data
    const newAccessToken = await refreshAccessToken(user);

    // Send the new access token in the response
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    // Pass any errors to the error handler middleware
    next(error);
  }
};
