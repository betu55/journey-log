const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    id: {
        type:       Number,
        unique:     true,
        required:   true,
    },
    placeName: {
        type:       String,
        required:   true,
        trim:       true
    },
    location: {
        type:       String,
        required:   true,
        trim:       true
    },
    dateVisited: {
        type:       Date,
        required:   true,
    },
    description: {
        type:       String,
        required:   true,
        trim:       true
    },
    rating: {
        type:       Number,
        required:   true,
        min: 1,
        max: 5
    },
    imageUrl: {
        type:       String,
        trim: true,
    }
});

const Place = mongoose.model('place', PlaceSchema);
module.exports = Place;