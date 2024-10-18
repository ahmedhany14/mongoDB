const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        validate: {
            validator: (name) => name.length > 2,
            validator: (name) => name.length < 10,
            message: "name should be less than 10 and  more than 2 characters"
        }
    },
    postCount: Number
})

const user = mongoose.model('user', userSchema)

module.exports = user; 