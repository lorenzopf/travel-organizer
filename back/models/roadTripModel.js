'use strict';
let mongoose = require('mongoose');
let roadTripSchema = mongoose.Schema({
    title: String,
    citiesName: String,
    budget: {},
    cities:[{}],
    places: [{}],
    dates:{},
    likes: {
        type: String,
        default: '0'
    },
    user_id: String,
    create_date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'RoadTrip' });

module.exports = mongoose.model('RoadTrip', roadTripSchema);