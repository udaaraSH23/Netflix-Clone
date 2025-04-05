import { Request, Response, NextFunction } from 'express';
import * as tvSeriesService from '../services/tvseries-service';
import {
  FetchingTvSeriesError,
  TvSeriesNotFoundError,
  InvalidTvSeriesIdError,
  TvSeriesCreationError,
  TvSeriesCategoryNotFoundError
} from '../Exceptions/tvseries-error';

export const getAllTvSeries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const series = await tvSeriesService.getAll();
    res.json(series);
  } catch (error) {
    next(new FetchingTvSeriesError('Error fetching TV series'));
  }
};

export const getTvSeriesByCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { category } = req.params;
  try {
    const series = await tvSeriesService.getByCategory(category);
    if (series.length === 0) {
      return next(new TvSeriesCategoryNotFoundError(`No series found in category: ${category}`));
    }
    res.json(series);
  } catch (error) {
    next(error);
  }
};

export const getTvSeriesById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const seriesId = Number(id);

  if (isNaN(seriesId)) {
    return next(new InvalidTvSeriesIdError('Invalid series ID'));
  }

  try {
    const series = await tvSeriesService.getById(seriesId);
    if (!series) {
      return next(new TvSeriesNotFoundError('TV series not found'));
    }
    res.json(series);
  } catch (error) {
    next(error);
  }
};

export const createTvSeries = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body;
  try {
    const created = await tvSeriesService.create(data);
    res.status(201).json(created);
  } catch (error) {
    next(new TvSeriesCreationError('Error creating TV series'));
  }
};

export const updateTvSeries = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const seriesId = Number(id);
  const updateData = req.body;

  if (isNaN(seriesId)) {
    return next(new InvalidTvSeriesIdError('Invalid series ID'));
  }

  try {
    const updated = await tvSeriesService.update(seriesId, updateData);
    if (!updated) {
      return next(new TvSeriesNotFoundError('TV series not found'));
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteTvSeries = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const seriesId = Number(id);

  if (isNaN(seriesId)) {
    return next(new InvalidTvSeriesIdError('Invalid series ID'));
  }

  try {
    const result = await tvSeriesService.remove(seriesId);
    if (result.deletedCount === 0) {
      return next(new TvSeriesNotFoundError('TV series not found'));
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
