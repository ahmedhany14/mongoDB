const mongoose = require('mongoose')

const creatorSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: Number,
    email: {
        type: String,
    },
    Blogs: [
        {
            id_: mongoose.Schema.Types.ObjectId,
        }
    ]
});

const creators = mongoose.model('creators', creatorSchema)

module.exports = creators;