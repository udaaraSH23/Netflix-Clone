const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    movies: {
        watched: [{
            type: mongoose.Schema.Types.ObjectId, // Reference to a Movie model
            ref: 'Movie'
        }],
        watching: [{
            type: mongoose.Schema.Types.ObjectId, // Reference to a Movie model
            ref: 'Movie'
        }],
        toBeWatched: [{
            type: mongoose.Schema.Types.ObjectId, // Reference to a Movie model
            ref: 'Movie'
        }]
    }
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

const User = mongoose.model('User', userSchema);

module.exports = User;
