import { Router } from 'express';
import * as tvSeriesController from '../controller/tvseries-controller';


const router = Router();

router.get('/', tvSeriesController.getAllTvSeries);
router.get('/category/:category', tvSeriesController.getTvSeriesByCategory);
router.get('/:id', tvSeriesController.getTvSeriesById);
router.post('/', tvSeriesController.createTvSeries);
router.put('/:id', tvSeriesController.updateTvSeries);
router.delete('/:id', tvSeriesController.deleteTvSeries);

export default router;
