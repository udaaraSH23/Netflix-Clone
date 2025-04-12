import { Router } from 'express';
import * as mediaController from '../controller/media-controller';

const router = Router();

// Route to get all media of a specific type (e.g., movies, series)
router.get('/:type', mediaController.getAllMedia);

// Route to get media of a specific type filtered by category
router.get('/:type/category/:category', mediaController.getMediaByCategory);

// Route to get a specific media item by its ID
router.get('/:type/:id', mediaController.getMediaById);

// Route to create a new media item of a specific type
router.post('/:type', mediaController.createMedia); // Add type to POST route

// Route to update an existing media item by its ID
router.put('/:type/:id', mediaController.updateMedia); // Add type to PUT route

// Route to delete a media item by its ID
router.delete('/:type/:id', mediaController.deleteMedia);

export default router;
