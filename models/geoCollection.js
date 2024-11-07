const mongoose = require('mongoose');

const Geo = mongoose.model('geoContacts', new mongoose.Schema());

Geo.createIndexes({location: '2dsphere'});
module.exports = Geo;