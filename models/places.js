const mongoose = require('mongoose');

const placesSchema = mongoose.Schema({
    name: {
        type: String, required: true
    }, location: {
        type: {
            type: String, default: 'Point',
        }, coordinates: {
            // the order is longitude, latitude, in the google maps the order is latitude, longitude
            type: [Number], required: true
        }
    },
})

const places = mongoose.model('places', placesSchema);

module.exports = places;