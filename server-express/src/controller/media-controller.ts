import { Request, Response, NextFunction } from 'express';
import * as mediaService from '../services/media-service';
import {
  FetchingMediaError,
  MediaNotFoundError,
  InvalidMediaIdError,
  MediaCreationError,
} from '../Exceptions/media-error';

// Controller to fetch all media based on type (movie or tvseries)
export const getAllMedia = async (req: Request, res: Response, next: NextFunction) => {
  const { type } = req.params; // Extract type from request parameters

  try {
    const media = await mediaService.getAllMedia(type); // Fetch media based on type
    if (media.length === 0) {
      return next(new MediaNotFoundError(`No ${type} found`)); // Handle case where no media is found
    }
    res.json(media); // Respond with the fetched media
  } catch (error) {
    next(new FetchingMediaError(`Error fetching ${type}`)); // Handle errors
  }
};

// Controller to fetch media by category and type
export const getMediaByCategory = async (req: Request, res: Response, next: NextFunction) => {
  const { category, type } = req.params; // Extract category and type from request parameters

  try {
    const media = await mediaService.getMediaByCategory(category, type); // Fetch media by category and type
    if (media.length === 0) {
      return next(new MediaNotFoundError(`No ${type} found in category: ${category}`)); // Handle case where no media is found
    }
    res.json(media); // Respond with the fetched media
  } catch (error) {
    next(new FetchingMediaError(`Error fetching ${type} by category`)); // Handle errors
  }
};

// Controller to fetch media by ID and type
export const getMediaById = async (req: Request, res: Response, next: NextFunction) => {
  const { id, type } = req.params; // Extract ID and type from request parameters
  const mediaId = Number(id); // Convert ID to a number

  if (isNaN(mediaId)) {
    return next(new InvalidMediaIdError('Invalid media ID')); // Validate media ID
  }

  try {
    const media = await mediaService.getMediaById(mediaId, type); // Fetch media by ID and type
    if (!media) {
      return next(new MediaNotFoundError(`${type} not found`)); // Handle case where media is not found
    }
    res.json(media); // Respond with the fetched media
  } catch (error) {
    next(new FetchingMediaError(`Error fetching ${type}`)); // Handle errors
  }
};

// Controller to create media based on type
export const createMedia = async (req: Request, res: Response, next: NextFunction) => {
  const { type } = req.params; // Extract type from request parameters
  const data = req.body; // Extract media data from request body

  try {
    const created = await mediaService.createMedia(data, type); // Create media based on type
    res.status(201).json(created); // Respond with the created media
  } catch (error) {
    next(new MediaCreationError(`Error creating ${type}`)); // Handle errors
  }
};

// Controller to update media by ID and type
export const updateMedia = async (req: Request, res: Response, next: NextFunction) => {
  const { id, type } = req.params; // Extract ID and type from request parameters
  const mediaId = Number(id); // Convert ID to a number
  const updateData = req.body; // Extract update data from request body

  if (isNaN(mediaId)) {
    return next(new InvalidMediaIdError('Invalid media ID')); // Validate media ID
  }

  try {
    const updated = await mediaService.updateMedia(mediaId, updateData, type); // Update media based on ID and type
    if (!updated) {
      return next(new MediaNotFoundError(`${type} not found`)); // Handle case where media is not found
    }
    res.json(updated); // Respond with the updated media
  } catch (error) {
    next(new FetchingMediaError(`Error updating ${type}`)); // Handle errors
  }
};

// Controller to delete media by ID and type
export const deleteMedia = async (req: Request, res: Response, next: NextFunction) => {
  const { id, type } = req.params; // Extract ID and type from request parameters
  const mediaId = Number(id); // Convert ID to a number

  if (isNaN(mediaId)) {
    return next(new InvalidMediaIdError('Invalid media ID')); // Validate media ID
  }

  try {
    const result = await mediaService.removeMedia(mediaId, type); // Delete media based on ID and type
    if (result.deletedCount === 0) {
      return next(new MediaNotFoundError(`${type} not found`)); // Handle case where media is not found
    }
    res.sendStatus(204); // Respond with no content status
  } catch (error) {
    next(new FetchingMediaError(`Error deleting ${type}`)); // Handle errors
  }
};
