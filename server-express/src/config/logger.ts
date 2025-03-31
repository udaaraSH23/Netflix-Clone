import winston from 'winston';

// Custom log levels and colors
const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: 'red bold',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'blue',
    }
};

// Apply custom colors to Winston (only for console logs)
winston.addColors(customLevels.colors);

// Define formats
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ level, message, timestamp }) => {
        return `[${timestamp}] ${level}: ${message}`;
    })
);

// Console format with colors
const consoleFormat = winston.format.combine(
    winston.format.colorize({ all: true }),  // Enable colors only for console logs
    logFormat
);

// File format (removes colors for clean logging)
const fileFormat = winston.format.combine(
    winston.format.uncolorize(),  // Remove colors for log files
    logFormat
);

const logger = winston.createLogger({
    levels: customLevels.levels,
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug', // Set log level based on environment
    transports: [
        new winston.transports.Console({ format: consoleFormat }), // Console logging with colors
        new winston.transports.File({ filename: 'logs/error.log', level: 'error', format: fileFormat }), // Errors only
        new winston.transports.File({ filename: 'logs/combined.log', format: fileFormat }), // All logs
    ],
});

export default logger;
