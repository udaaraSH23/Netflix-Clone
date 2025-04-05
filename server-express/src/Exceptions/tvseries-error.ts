import { BaseError } from './base-error';

export class FetchingTvSeriesError extends BaseError {
  constructor(message: string) {
    super(message, 500);
  }
}

export class TvSeriesNotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class InvalidTvSeriesIdError extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class TvSeriesCategoryNotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class TvSeriesCreationError extends BaseError {
  constructor(message: string) {
    super(message, 500);
  }
}
