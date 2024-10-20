const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: String,
    userIDs: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        required: true,
        ref: 'user2'
    }
})
const comments = mongoose.model('comments', commentSchema)

module.exports = comments; 