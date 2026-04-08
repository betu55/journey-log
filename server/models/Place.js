const mongoose = require('mongoose');

const PlaceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
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
    },
    latitude:{
        type:       Number,
        min: -90,
        max: 90,
        default: null
    },
    longitude:{
        type:       Number,
        min: -180,
        max: 180,
        default: null
    },
    comments: [
        {
            username: String,
            text: String,
            time: { type: Date, default: Date.now }
        }
    ]
});

const Place = mongoose.model('place', PlaceSchema);
module.exports = Place;