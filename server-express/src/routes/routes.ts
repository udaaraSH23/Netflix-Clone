import express, { Router } from 'express';
import authRoutes from './auth';
import movieRoutes from './movies';
// import tvSeriesRoutes from './tvSeries';
// import userRoutes from './users';
// import reviewRoutes from './reviews';

const router: Router = express.Router();

router.use('/auth', authRoutes);
router.use('/movies', movieRoutes);
// router.use('/tvSeries', tvSeriesRoutes);
// router.use('/users', userRoutes);
// router.use('/reviews', reviewRoutes);

export default router;
