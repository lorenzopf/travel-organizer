'use strict';
let mongoose = require('mongoose');
let likesSchema = mongoose.Schema({
    user_id: String,
    road_trip_id: String,
    create_date: {
        type: Date,
        default: Date.now
    }
}, { collection: 'Likes' });

module.exports = mongoose.model('Likes', likesSchema);