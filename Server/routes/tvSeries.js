const express = require('express');
const router = express.Router();
const TvSeries = require('../models/tvSeriesModel'); 
const auth = require('../middleware/auth'); 

// GET /tvseries - Get all TV series
router.get('/', auth, async (req, res) => {
    try {
        const tvSeries = await TvSeries.find();
        res.json(tvSeries);
    } catch (error) {
        console.error('Error fetching TV series:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /tvseries/:category - Get all TV series by category
router.get('/:category', async (req, res) => {
    try {
        const category = req.params.category;
        
        // Fetch the movies from the database by category
        const tvSeries = await TvSeries.find({ category: category });
        
        if (tvSeries.length === 0) {
            return res.status(404).json({ message: 'No Tv Series found for this category' });
        }
        
        res.json(tvSeries);
    } catch (error) {
        console.error('Error fetching Tv Series:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /tvseries/:id - Get a specific TV series by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const tvSeries = await TvSeries.findOne({ id });

        if (!tvSeries) {
            return res.status(404).json({ message: 'TV series not found' });
        }

        res.json(tvSeries);
    } catch (error) {
        console.error('Error fetching TV series by ID:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// POST /tvseries - Create a new TV series
router.post('/', auth, async (req, res) => {
    try {
        const { id, name, description, rating, category, posterUrl, backdropUrl, videoUrl, year } = req.body;

        // Create a new TV series instance
        const newTvSeries = new TvSeries({
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

        // Save the new TV series to the database
        const savedTvSeries = await newTvSeries.save();
        
        res.status(201).json(savedTvSeries);
    } catch (error) {
        console.error('Error creating TV series:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// PUT /tvseries/:id - Update a specific TV series by ID
router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTvSeriesData = req.body;

        // Update the TV series in the database
        const updatedTvSeries = await TvSeries.findOneAndUpdate(
            { id },
            updatedTvSeriesData,
            { new: true, runValidators: true }
        );

        if (!updatedTvSeries) {
            return res.status(404).json({ message: 'TV series not found' });
        }

        res.json(updatedTvSeries);
    } catch (error) {
        console.error('Error updating TV series:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// DELETE /tvseries/:id - Delete a specific TV series by ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the TV series from the database
        const result = await TvSeries.deleteOne({ id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'TV series not found' });
        }

        res.sendStatus(204); // No content
    } catch (error) {
        console.error('Error deleting TV series:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
