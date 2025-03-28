// src/error/CustomError.ts

export class CustomError extends Error {
    statusCode: number;
    errorCode: string;

    constructor(message: string, statusCode: number, errorCode: string) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.name = this.constructor.name;
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string = 'Resource not found') {
        super(message, 404, 'NOT_FOUND');
    }
}

export class ValidationError extends CustomError {
    constructor(message: string = 'Validation error') {
        super(message, 400, 'VALIDATION_ERROR');
    }
}

export class AuthenticationError extends CustomError {
    constructor(message: string = 'Authentication failed') {
        super(message, 401, 'AUTH_ERROR');
    }
}
