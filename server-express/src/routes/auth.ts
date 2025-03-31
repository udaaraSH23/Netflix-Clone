// src/routes/authRoutes.ts
import express from 'express';
import { login, register } from '../controller/auth-controller';
import { validate } from '../middleware/validate';
import { registerSchema } from '../validations/authValidation';
import { refreshToken } from '../controller/auth-controller';
import { verifyRefreshToken } from '../middleware/jwt-middleware';

const authRoutes = express.Router();

//Check the Auth routes
authRoutes.get('/', (req, res) => {
  res.send('Auth routes');
});
authRoutes.post('/login', login); // User Login
authRoutes.post('/register', validate(registerSchema), register); // User Registration
authRoutes.post('/refresh-token', verifyRefreshToken, refreshToken); // Refresh Token

export default authRoutes;
