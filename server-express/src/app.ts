import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/error-handler'; // Import the error handler
import routes from './routes/routes'; // Import the routes

// Import the Winston logger and the express-winston middleware
import expressWinston from 'express-winston';
import logger from './config/logger';

// Create an Express app
const app: Application = express();

// Middleware to parse cookies
app.use(cookieParser());


// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to log incoming HTTP requests
app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: true, // Logs request metadata (URL, method, status code, etc.)
    msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}}", // Custom log message
    expressFormat: true, // Format like Apache logs
    colorize: false, // Disable colors for log files
    ignoreRoute: (req, res) => false, // Do not ignore any routes
}));

// Routes
app.use('/api', routes);

// Error handling middleware for logging errors (will log errors to your log file)
app.use(expressWinston.errorLogger({
    winstonInstance: logger,
}));

// Error handling middleware for sending custom error responses
app.use(errorHandler);

// Check the API is running with a simple test route
app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });  // No need to call .status(200)
});

export default app; // Export the app instance to be used in server.ts
