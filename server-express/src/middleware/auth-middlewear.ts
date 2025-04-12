import e, { Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { AuthenticatedRequest } from 'src/types/express';
import { verifyAccessToken, extractUserRole, verifyRefreshToken } from '../utils/jwtUtil';
import {ForbiddenException } from '../Exceptions/auth-error'; // Import custom errors
dotenv.config();

function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
        req.user = verifyAccessToken(req); // Attach the user to the request
        next();
    } catch (error) {
      next(error); 
    }
}

function authenticateRefreshToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
        req.user = verifyRefreshToken(req); // Attach the user to the request using refresh token
        next();
    } catch (error) {
        next(error);
    }
}

function checkUserRole(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const role = token ? extractUserRole(token) : null;
        if (!role || (role !== 'user' && role !== 'admin')) {
            return next(new ForbiddenException('Access restricted to users or admins'));
        }
        next();
    } catch (error) {
        next(error);
    }
}

function checkAdminRole(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token || extractUserRole(token) !== 'admin') {
            return next(new ForbiddenException('Admin privileges are required'));
        }
        next();
    } catch (error) {
        next(error);
    }
}

export { authenticateToken, checkUserRole, checkAdminRole, authenticateRefreshToken };
