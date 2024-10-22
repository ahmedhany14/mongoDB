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
        id_: mongoose.Schema.Types.ObjectId,
    },
    blog: {
        id_: mongoose.Schema.Types.ObjectId,
    }
})

const comments = mongoose.model('comments', commentSchema)

module.exports = comments   