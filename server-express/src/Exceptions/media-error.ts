import { BaseError } from './base-error';

// Error for issues while fetching media
export class FetchingMediaError extends BaseError {
  constructor(message: string) {
    super(message, 500);
  }
}

// Error for when the requested media is not found
export class MediaNotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}

// Error for invalid media ID provided
export class InvalidMediaIdError extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}

// Error for when the requested media category is not found
export class MediaCategoryNotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}

// Error for issues during media creation
export class MediaCreationError extends BaseError {
  constructor(message: string) {
    super(message, 500);
  }
}
