const mongoose = require('mongoose')

const creatorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: Number,
    email: {
        type: String,
    },
    Blogs: [String]
});

const creators = mongoose.model('creators', creatorSchema)

module.exports = creators;