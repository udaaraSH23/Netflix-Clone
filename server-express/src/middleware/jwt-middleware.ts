import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/express'; // Import your custom type

interface TokenPayload {
  id: string;
  role: string;
}

/**
 * Middleware to verify the access token and attach the user to the request
 */
export const verifyAccessToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: string;
    };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

/**
 * Middleware to check user roles
 */
export const verifyRole = (roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};

/**
 * Middleware to verify refresh token from cookies
 */
// Middleware to verify the refresh token
export const verifyRefreshToken = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token is required' });
    }
  
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as TokenPayload;
      req.user = decoded;  // Attach the user to the request object
      next();  // Proceed to the next middleware/controller
    } catch (error) {
      res.status(403).json({ message: 'Invalid refresh token' });
    }
  };
  
