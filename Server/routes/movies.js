const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const Movie = require('../models/moviesModel');

// GET /movies
router.get('/',auth, (req, res) => {
    Movie.find()
        .then(movies => {
            console.log('Successfully fetched movies');
            res.json(movies); // Send the movies as a JSON response
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
            res.status(500).json({ error: 'An error occurred while fetching movies.' });
        });
});

// GET /movies/:category
router.get('/:category', async (req, res) => {
    try {
        const category = req.params.category;
        
        // Fetch the movies from the database by category
        const movies = await Movie.find({ category: category });
        
        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found for this category' });
        }
        
        res.json(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// POST /movies
router.post('/',auth, async (req, res) => {
    try {
        const { id, name, description, rating, category, posterUrl, backdropUrl, videoUrl, year } = req.body;

        // Validate the required fields
        if (!id || !name || !description || !rating || !category || !posterUrl || !backdropUrl || !videoUrl || !year) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new movie instance
        const newMovie = new Movie({
            id,
            name,
            description,
            rating,
            category,
            posterUrl,
            backdropUrl,
            videoUrl,
            year
        });

        // Save the movie to the database
        const savedMovie = await newMovie.save();

        // Respond with the created movie
        res.status(201).json(savedMovie);
    } catch (error) {
        console.error('Error creating movie:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /movies/:id
router.get('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        
        // Fetch the movie from the database
        const movie = await Movie.findOne({ id: movieId });
        
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        
        res.json(movie);
    } catch (error) {
        console.error('Error fetching movie:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// PUT /movies/:id
router.put('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;
        const updatedMovieData = req.body;

        // Update the movie in the database
        const updatedMovie = await Movie.findOneAndUpdate(
            { id: movieId },
            updatedMovieData,
            { new: true, runValidators: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.json(updatedMovie);
    } catch (error) {
        console.error('Error updating movie:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// DELETE /movies/:id
router.delete('/:id', async (req, res) => {
    try {
        const movieId = req.params.id;

        // Delete the movie from the database
        const result = await Movie.deleteOne({ id: movieId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.sendStatus(204); // No content
    } catch (error) {
        console.error('Error deleting movie:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;