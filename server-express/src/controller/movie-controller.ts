import { Request, Response } from 'express';
import { IMovie } from '../models/movie-model'; 
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

    // const movieData: Omit<IMovie, "_id"> = { id, name, description, rating, category, posterUrl, backdropUrl, videoUrl, year };

    // // Call the service to create the movie
    // const newMovie = await movieService.createMovie(movieData);

    // res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: 'Error creating movie' });
  }
};

// GET /movies/:id
export const getMovieByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const movie = await movieService.getMovieById(id);
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /movies/:id
export const updateMovieController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const updatedMovieData = req.body;
  try {
    const updatedMovie = await movieService.updateMovie(id, updatedMovieData);
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
  try {
    const result = await movieService.deleteMovie(id);
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Movie not found' });
    }
    res.sendStatus(204); // No content
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
