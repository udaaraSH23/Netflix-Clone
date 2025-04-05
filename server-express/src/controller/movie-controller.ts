import { NextFunction, Request, Response } from 'express';
import * as movieService from '../services/movie-service';
import {
  FetchingMovieError,
  InvalidMovieIdError,
  MovieNotFoundCategoryError,
  MovieNotFoundError,
  MovieCreationError
} from '../Exceptions/movie-error';

// Utility: Validate and parse movie ID
const parseMovieId = (id: string, next: NextFunction): number | undefined => {
  const movieId = Number(id);
  if (isNaN(movieId)) {
    next(new InvalidMovieIdError('Invalid movie ID'));
    return;
  }
  return movieId;
};

// GET /movies
export const getMoviesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const movies = await movieService.getMovies();
    res.json(movies);
  } catch (error) {
    next(new FetchingMovieError('Error fetching movies'));
  }
};

// GET /movies/:id
export const getMovieByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const movieId = parseMovieId(req.params.id, next);
  if (!movieId) return;

  try {
    const movie = await movieService.getMovieById(movieId);
    if (!movie) return next(new MovieNotFoundError('Movie not found'));
    res.json(movie);
  } catch (error) {
    next(error);
  }
};

// GET /movies/category/:category
export const getMoviesByCategoryController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category } = req.params;
    const movies = await movieService.getMoviesByCategory(category);
    if (movies.length === 0) return next(new MovieNotFoundCategoryError(`No movies found in category: ${category}`));
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

// POST /movies
export const createMovieController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const requiredFields = ['id', 'name', 'description', 'rating', 'category', 'posterUrl', 'backdropUrl', 'videoUrl', 'year'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        res.status(400).json({ message: `Missing required field: ${field}` });
      }
    }

    const newMovie = await movieService.createMovie(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    next(new MovieCreationError('Error creating movie'));
  }
};

// PUT /movies/:id
export const updateMovieController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const movieId = parseMovieId(req.params.id, next);
  if (!movieId) return;

  try {
    const updatedMovie = await movieService.updateMovie(movieId, req.body);
    if (!updatedMovie) return next(new MovieNotFoundError('Movie not found'));
    res.json(updatedMovie);
  } catch (error) {
    next(error);
  }
};

// DELETE /movies/:id
export const deleteMovieController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const movieId = parseMovieId(req.params.id, next);
  if (!movieId) return;

  try {
    const result = await movieService.deleteMovie(movieId);
    if (result.deletedCount === 0) return next(new MovieNotFoundError('Movie not found'));
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
