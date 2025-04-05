import { Request, Response } from 'express';
import Movie from  '../models/movie-model'
import * as movieService from '../services/movie-service';

// GET /movies
export const getMoviesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const movies = await movieService.getMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching movies.' });
  }
};

// GET /movies/:id
export const getMovieByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const movieId = Number(id); // Convert to number

  // Check if the id is a valid number
  if (isNaN(movieId)) {
    res.status(400).json({ message: 'Invalid movie ID' });
    return;
  }
  try {
    const movie = await movieService.getMovieById(movieId);
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /movies/:category
export const getMoviesByCategoryController = async (req: Request, res: Response): Promise<void> => {
  const { category } = req.params;
  try {
    const movies = await movieService.getMoviesByCategory(category);
    if (movies.length === 0) {
      res.status(404).json({ message: 'No movies found for this category' });
      return;
    }
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /movies
export const createMovieController = async (req: Request, res: Response): Promise<void> => {
  const { id, name, description, rating, category, posterUrl, backdropUrl, videoUrl, year } = req.body;

  try {
    if (!id || !name || !description || !rating || !category || !posterUrl || !backdropUrl || !videoUrl || !year) {
      res.status(400).json({ message: 'All fields are required.' });
        return;
    }

    // Your movie data
  const movieData = { id, name, description, rating, category, posterUrl, backdropUrl, videoUrl, year };

// Create a new Mongoose document from the model
const movieInstance = new Movie(movieData);

    // // Call the service to create the movie
    const newMovie = await movieInstance.save();

    // res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: 'Error creating movie' });
  }
};



// PUT /movies/:id
export const updateMovieController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const movieId = Number(id);

  // Check if the id is a valid number
  if (isNaN(movieId)) {
    res.status(400).json({ message: 'Invalid movie ID' });
    return;
  }
  
  const updatedMovieData = req.body;
  try {
    const updatedMovie = await movieService.updateMovie(movieId, updatedMovieData);
    if (!updatedMovie) {
      res.status(404).json({ message: 'Movie not found' });
    }
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /movies/:id
export const deleteMovieController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const movieId = Number(id); // Convert to number

  // Check if the id is a valid number
  if (isNaN(movieId)) {
    res.status(400).json({ message: 'Invalid movie ID' });
    return;
  }

  try {
    const result = await movieService.deleteMovie(movieId);
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Movie not found' });
    }
    res.sendStatus(204); // No content
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
