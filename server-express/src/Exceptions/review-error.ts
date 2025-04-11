import { BaseError } from './base-error';

export class ReviewNotFoundError extends BaseError {
    constructor(message: string) {
        super(message, 404); // 404 is the HTTP status code for Not Found
    }
}

export class InvalidReviewIdError extends BaseError {
    constructor(message: string) {
        super(message, 400); // 400 is the HTTP status code for Bad Request
    }
}

export class ReviewCreationError extends BaseError {
    constructor(message: string) {
        super(message, 500); // 500 is the HTTP status code for Internal Server Error
    }
}

export class ReviewUpdateError extends BaseError {
    constructor(message: string) {
        super(message, 500); // 500 is the HTTP status code for Internal Server Error
    }
}

export class ReviewDeletionError extends BaseError {
    constructor(message: string) {
        super(message, 500); // 500 is the HTTP status code for Internal Server Error
    }
}
