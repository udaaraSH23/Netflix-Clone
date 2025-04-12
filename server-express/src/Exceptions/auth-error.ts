import { BaseError } from "./base-error";

export class InvalidCredentialsException extends BaseError {
    constructor(message: string) {
        super(message, 401); // 401 is the HTTP status code for Unauthorized
    }
}

export class UserNotFoundException extends BaseError {
    constructor(message: string) {
        super(message, 404);
    }
}

export class UserAlreadyExistException extends BaseError {
    constructor(message: string) {
        super(message, 409); // 409 is the HTTP status code for Conflict
    }
}


export class ForbiddenException extends BaseError {
    constructor(message: string) {
        super(message, 403); // 403 is the HTTP status code for Forbidden
    }
}


