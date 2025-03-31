import app from './app'; // Import the app instance from app.ts
import { config } from 'dotenv'; // Use ES module import for dotenv
import connectDB from './config/db'; // Use ES module import for db connection
import logger from './config/logger';

// Load the environment variables
config();

//Connect to the DB
connectDB();


// Start the server
const PORT = process.env.PORT ? Number(process.env.PORT) : 4444;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

// Handle uncaught exceptions and unhandled promise rejections gracefully
process.on('uncaughtException', (err: Error) => {
    logger.error(`Uncaught exception: ${err.message}`);
    process.exit(1); // Exit the process to avoid running in an inconsistent state
});

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    logger.error('Unhandled rejection at:', promise, 'reason:', reason);
    process.exit(1); // Exit the process to avoid running in an inconsistent state
});
