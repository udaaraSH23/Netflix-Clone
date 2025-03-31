import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../Exceptions/base-error';  // Import the base error class
import logger from '../config/logger';  // Import the logger

export const errorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {  // `void` since the middleware does not return a response, it modifies `res` directly
    logger.error(err);

    if (err instanceof BaseError) {
   
        res.status(err.statusCode).json({
            message: err.message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
        return;  // Stop here, no need to return anything, just send the response
    }

    // Handle unexpected errors
    res.status(500).json({
        message: 'Something went wrong! Please try again later.',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
};
 