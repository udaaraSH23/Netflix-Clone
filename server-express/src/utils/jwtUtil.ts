import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/express";
import { InvalidRefreshToknError, InvalidTokenError, NoRefreshTokenError, NoTokenError } from "../Exceptions/jwt-error";

const ACCESS_TOKEN_EXPIRY = "2h";
const REFRESH_TOKEN_EXPIRY = "7d";

interface TokenPayload {
    id: string;
    role: string;
}

/**
 * Generates an access token
 */
export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    });
};

/**
 * Generates a refresh token
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    });
};

/**
 * Verifies the access token and attaches the user to the request
 */
export const verifyAccessToken = (req: AuthenticatedRequest): TokenPayload => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new NoTokenError('Access token is required');
    }

    try {
        return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    } catch (error) {
        throw new InvalidTokenError('Invalid or expired token');
    }
};

/**
 * Verifies the refresh token from cookies
 */
export const verifyRefreshToken = (req: AuthenticatedRequest): TokenPayload => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        throw new NoRefreshTokenError('Refresh token is required');
    }

    try {
        return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as TokenPayload;
    } catch (error) {
        throw new InvalidRefreshToknError('Invalid or expired token');
    }
};

/**
 * Extracts the user role from a token
 */
export const extractUserRole = (token: string): string => {
    try {
        const decoded = jwt.decode(token) as TokenPayload | null;
        if (!decoded || !decoded.role) {
            throw new Error("Invalid token or role not found");
        }
        return decoded.role;
    } catch (error) {
        throw new InvalidTokenError("Failed to extract user role");
    }
};

