import { BaseError } from "./base-error"

//Refresh token error
//Invalid refresh token error
export class InvalidRefreshToknError extends BaseError {
  constructor(message: string) {
    super(message, 400)
  }
}

//No refresh token error
export class NoRefreshTokenError extends BaseError {
  constructor(message: string) {
    super(message, 400)
  }
}


//Access Token error
//Invalid token error 
export class InvalidTokenError extends BaseError {
  constructor(message: string) {
    super(message, 403)
  }
}
//No token error
export class NoTokenError extends BaseError {
  constructor(message: string) {
    super(message, 401)
  }
}

//Invalid User Data

export class InvalidUserDataError extends BaseError {
  constructor(message: string) {
    super(message, 400)
  }
}