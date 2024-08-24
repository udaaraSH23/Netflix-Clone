const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
const auth = require('../middleware/auth');


router.get('/',auth, async (req, res) => {
    try {
        // Find all users
        const users = await User.find();

        if (users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }
        res.json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /users/:username - Get user details by username
router.get('/:username', auth, async (req, res) => {
    try {
        const username = req.params.username;

        // Find user by username
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Edit user details by username
router.put('/:username', auth, async (req, res) => {
    try {
        const username = req.params.username;
        const updatedUser = req.body;

        
        const validFields = ['username', 'email', 'password']; 
        const filteredUser = {};
        validFields.forEach(field => {
            if (updatedUser[field] !== undefined) {
                filteredUser[field] = updatedUser[field];
            }
        });

        // Update user details
        const user = await User.findOneAndUpdate(
            { username: username },  
            filteredUser,  
            { new: true, runValidators: true } 
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Delete user by username
router.delete('/:username', auth, async (req, res) => {
    try {
        const username = req.params.username;

        // Delete user by username
        const user = await User.findOneAndDelete({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
