import Movie, { IMovie } from '../models/movie-model';

// Get all movies
export const getMovies = async (): Promise<IMovie[]> => {
  return await Movie.find();
};

// Get movie by ID
export const getMovieById = async (id: number): Promise<IMovie | null> => {
  return await Movie.findOne({ id });
};

// Get movies by category
export const getMoviesByCategory = async (category: string): Promise<IMovie[]> => {
  return await Movie.find({ category });
};

// Create movie
export const createMovie = async (movieData: IMovie): Promise<IMovie> => {
  const movie = new Movie(movieData);
  return await movie.save();
};

// Update movie
export const updateMovie = async (id: number, updatedData: Partial<IMovie>): Promise<IMovie | null> => {
  return await Movie.findOneAndUpdate({ id }, updatedData, {
    new: true,
    runValidators: true,
  });
};

// Delete movie
export const deleteMovie = async (id: number): Promise<{ deletedCount: number }> => {
  return await Movie.deleteOne({ id });
};
