const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    commentIDs: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        required: true,
        ref: "comments"
    }
})
const postBlog = mongoose.model('postBlog', postSchema)

module.exports = postBlog; 