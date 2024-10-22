const mongoose = require('mongoose')
const comments = require('./comments')
const creators = require('./Creators')
const blogSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    tags: [
        {
            type: String,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    creator: {
        id_: mongoose.Schema.Types.ObjectId,
    },
    comments: [
        {
            id_: mongoose.Schema.Types.ObjectId,
        }
    ]
})

const blogs = mongoose.model('blogs', blogSchema)

module.exports = blogs; 