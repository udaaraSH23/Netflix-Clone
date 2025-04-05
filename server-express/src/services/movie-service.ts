import Movie, { IMovie } from  '../models/movie-model'

// Get all movies
export const getMovies = async (): Promise<IMovie[]> => {
  try {
    return await Movie.find();
  } catch (error) {
    throw new Error('Error fetching movies');
  }
};

// Get movies by category
export const getMoviesByCategory = async (category: string): Promise<IMovie[]> => {
  try {
    return await Movie.find({ category });
  } catch (error) {
    throw new Error(`Error fetching movies in category ${category}`);
  }
};

// Get a movie by ID
export const getMovieById = async (id: number): Promise<IMovie | null> => {
  try {
    return await Movie.findOne({ id });
  } catch (error) {
    throw new Error('Error fetching movie');
  }
};

// Create a new movie
export const createMovie = async (movieData:IMovie): Promise<IMovie> => {
  try {
    const newMovie = new Movie(movieData);
    return await newMovie.save();
  } catch (error) {
    throw new Error('Error creating movie');
  }
};

// Update an existing movie
export const updateMovie = async (id: number, updatedData: Partial<IMovie>): Promise<IMovie | null> => {
  try {
    return await Movie.findOneAndUpdate({ id }, updatedData, { new: true, runValidators: true });
  } catch (error) {
    throw new Error('Error updating movie');
  }
};

// Delete a movie by ID
export const deleteMovie = async (id: number): Promise<{ deletedCount: number }> => {
  try {
    return await Movie.deleteOne({ id });
  } catch (error) {
    throw new Error('Error deleting movie');
  }
};
