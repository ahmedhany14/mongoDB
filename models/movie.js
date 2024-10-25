const mongoose = require('mongoose');

const movies = mongoose.model('movies', new mongoose.Schema());
module.exports = movies;