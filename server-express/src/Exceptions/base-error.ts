// src/exceptions/BaseError.ts
export class BaseError extends Error {
    statusCode: number;
    message: string;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.name = this.constructor.name; // Name of the class
        Error.captureStackTrace(this, this.constructor);
    }
}



export class BadRequestError extends BaseError {
    constructor(message: string) {
        super(message, 400); // 400 is the HTTP status code for Bad Request
    }
}


export class NotFoundException extends BaseError {
    constructor(message: string) {
        super(message, 404); // 400 is the HTTP status code for Bad Request
    }
}
