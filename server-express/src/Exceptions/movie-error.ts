import { BaseError } from "./base-error";

export class FetchingMovieError extends BaseError {
    constructor(message: string) {
        super(message, 500); // 401 is the HTTP status code for Unauthorized
        
    }
}
export class InvalidMovieIdError extends BaseError {
    constructor(message: string) {
        super(message, 400); // 400 is the HTTP status code for Bad Request
    }
}

export class MovieNotFoundError extends BaseError {
    constructor(message: string) {
        super(message, 404); // 404 is the HTTP status code for Not Found
    }
}

export class MovieNotFoundCategoryError extends BaseError {
    constructor(message: string) {
        super(message, 404); // 404 is the HTTP status code for Not Found
    }
}

export class MovieCreationError extends BaseError {
    constructor(message: string) {
        super(message, 500); // 500 is the HTTP status code for Internal Server Error
    }
}