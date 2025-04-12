import { Request, Response, NextFunction } from 'express';
import * as tvSeriesService from '../services/tvseries-service';
import {
  FetchingTvSeriesError,
  TvSeriesNotFoundError,
  InvalidTvSeriesIdError,
  TvSeriesCreationError,
  TvSeriesCategoryNotFoundError
} from '../Exceptions/tvseries-error';

// Controller to fetch all TV series
export const getAllTvSeries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const series = await tvSeriesService.getAll(); // Fetch all TV series from the service
    res.json(series); // Respond with the fetched series
  } catch (error) {
    next(new FetchingTvSeriesError('Error fetching TV series')); // Handle errors
  }
};

// Controller to fetch TV series by category
export const getTvSeriesByCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { category } = req.params; // Extract category from request parameters
  try {
    const series = await tvSeriesService.getByCategory(category); // Fetch series by category
    if (series.length === 0) {
      // If no series found, throw a category not found error
      return next(new TvSeriesCategoryNotFoundError(`No series found in category: ${category}`));
    }
    res.json(series); // Respond with the fetched series
  } catch (error) {
    next(error); // Handle errors
  }
};

// Controller to fetch a TV series by its ID
export const getTvSeriesById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params; // Extract ID from request parameters
  const seriesId = Number(id); // Convert ID to a number

  if (isNaN(seriesId)) {
    // If ID is not a valid number, throw an invalid ID error
    return next(new InvalidTvSeriesIdError('Invalid series ID'));
  }

  try {
    const series = await tvSeriesService.getById(seriesId); // Fetch series by ID
    if (!series) {
      // If no series found, throw a not found error
      return next(new TvSeriesNotFoundError('TV series not found'));
    }
    res.json(series); // Respond with the fetched series
  } catch (error) {
    next(error); // Handle errors
  }
};

// Controller to create a new TV series
export const createTvSeries = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body; // Extract data from request body
  try {
    const created = await tvSeriesService.create(data); // Create a new TV series
    res.status(201).json(created); // Respond with the created series
  } catch (error) {
    next(new TvSeriesCreationError('Error creating TV series')); // Handle errors
  }
};

// Controller to update an existing TV series
export const updateTvSeries = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params; // Extract ID from request parameters
  const seriesId = Number(id); // Convert ID to a number
  const updateData = req.body; // Extract update data from request body

  if (isNaN(seriesId)) {
    // If ID is not a valid number, throw an invalid ID error
    return next(new InvalidTvSeriesIdError('Invalid series ID'));
  }

  try {
    const updated = await tvSeriesService.update(seriesId, updateData); // Update the TV series
    if (!updated) {
      // If no series found to update, throw a not found error
      return next(new TvSeriesNotFoundError('TV series not found'));
    }
    res.json(updated); // Respond with the updated series
  } catch (error) {
    next(error); // Handle errors
  }
};

// Controller to delete a TV series
export const deleteTvSeries = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params; // Extract ID from request parameters
  const seriesId = Number(id); // Convert ID to a number

  if (isNaN(seriesId)) {
    // If ID is not a valid number, throw an invalid ID error
    return next(new InvalidTvSeriesIdError('Invalid series ID'));
  }

  try {
    const result = await tvSeriesService.remove(seriesId); // Delete the TV series
    if (result.deletedCount === 0) {
      // If no series found to delete, throw a not found error
      return next(new TvSeriesNotFoundError('TV series not found'));
    }
    res.sendStatus(204); // Respond with no content status
  } catch (error) {
    next(error); // Handle errors
  }
};
