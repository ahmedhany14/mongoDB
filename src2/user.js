const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        validate: {
            validator: (name) => name.length > 2,
            validator: (name) => name.length < 10,
            message: "name should be less than 10 and  more than 2 characters"
        },
    },
    postIDs: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        required: true,
        ref: 'postBlog'
    }
})

const users2 = mongoose.model('users2', userSchema)
module.exports = users2; 