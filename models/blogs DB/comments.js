const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    creator: {
        creator_id: String,
    },
    blog: {
        blog_id: String,
    }
})

const comments = mongoose.model('comments', commentSchema)

module.exports = comments   