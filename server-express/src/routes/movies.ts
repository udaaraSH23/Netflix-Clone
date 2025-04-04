import express from 'express';
import * as movieController from '../controller/movie-controller';


const movieRouter = express.Router();

// GET /movies
movieRouter.get('/', movieController.getMoviesController);

// GET /movies/:id
movieRouter.get('/:id', movieController.getMovieByIdController);

// GET /movies/:category
movieRouter.get('/:category', movieController.getMoviesByCategoryController);

// POST /movies
movieRouter.post('/', movieController.createMovieController);

// PUT /movies/:id
movieRouter.put('/:id', movieController.updateMovieController);

// DELETE /movies/:id
movieRouter.delete('/:id', movieController.deleteMovieController);

export default movieRouter;
