import Movie, { IMovie } from '../models/movie-model';
import TVSeries, { ITvSeries } from '../models/tvseries-model';

type Media = IMovie | ITvSeries;

// Fetch all media of a specific type (movies or TV series)
export const getAllMedia = async (type: string): Promise<Media[]> => {
  if (type === 'movie') {
    return await Movie.find();
  } else if (type === 'tvseries') {
    return await TVSeries.find();
  }
  return [];
};

// Fetch media by category and type (e.g., action movies or drama TV series)
export const getMediaByCategory = async (category: string, type: string): Promise<Media[]> => {
  if (type === 'movie') {
    return await Movie.find({ category });
  } else if (type === 'tvseries') {
    return await TVSeries.find({ category });
  }
  return [];
};

// Fetch a single media item by its ID and type
export const getMediaById = async (id: number, type: string): Promise<Media | null> => {
  if (type === 'movie') {
    return await Movie.findOne({ id });
  } else if (type === 'tvseries') {
    return await TVSeries.findOne({ id });
  }
  return null;
};

// Create a new media item (movie or TV series)
export const createMedia = async (data: IMovie | ITvSeries, type: string): Promise<Media> => {
  if (type === 'movie') {
    const newMovie = new Movie(data); // Create a new movie
    return await newMovie.save();
  } else if (type === 'tvseries') {
    const newSeries = new TVSeries(data); // Create a new TV series
    return await newSeries.save();
  }
  throw new Error('Invalid media type'); // Handle invalid type
};

// Update an existing media item by its ID and type
export const updateMedia = async (
  id: number,
  data: Partial<IMovie | ITvSeries>,
  type: string
): Promise<Media | null> => {
  if (type === 'movie') {
    return await Movie.findOneAndUpdate({ id }, data, { new: true, runValidators: true }); // Update movie
  } else if (type === 'tvseries') {
    return await TVSeries.findOneAndUpdate({ id }, data, { new: true, runValidators: true }); // Update TV series
  }
  throw new Error('Invalid media type'); // Handle invalid type
};

// Remove a media item by its ID and type
export const removeMedia = async (id: number, type: string): Promise<{ deletedCount?: number }> => {
  if (type === 'movie') {
    return await Movie.deleteOne({ id });
  } else if (type === 'tvseries') {
    return await TVSeries.deleteOne({ id });
  }
  return { deletedCount: 0 };
};
