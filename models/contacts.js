const mongoose = require('mongoose');
const contacts = mongoose.model('contacts', new mongoose.Schema());
module.exports = contacts;