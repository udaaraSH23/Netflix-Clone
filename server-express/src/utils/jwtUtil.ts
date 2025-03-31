import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

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

