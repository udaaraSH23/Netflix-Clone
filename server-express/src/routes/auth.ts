// src/routes/authRoutes.ts
import express from 'express';
import { login, register, refreshToken, assignAdminRole } from '../controller/auth-controller';
import { validate } from '../middleware/validate';
import { registerSchema } from '../validations/auth-validation';
import { authenticateToken, checkUserRole, checkAdminRole,authenticateRefreshToken } from '../middleware/auth-middlewear'; // Import the authentication middleware

const authRoutes = express.Router();

//Check the Auth routes
authRoutes.get('/', (req, res) => {
  res.send('Auth routes');
});
authRoutes.post('/login', login); // User Login
authRoutes.post('/register', validate(registerSchema), register); // User Registration
authRoutes.post('/refresh-token', authenticateRefreshToken, checkUserRole, refreshToken); // Refresh Token
authRoutes.post('/assign-admin', authenticateToken, checkAdminRole, assignAdminRole); // Assign user to admin role

export default authRoutes;
