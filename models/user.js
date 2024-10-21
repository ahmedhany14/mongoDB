const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: Number,
    isInstactor: {
        type: Boolean,
        default: false
    },
    cources: [
        {
            titel: String,
            describtion: String,
            CreatedAt: {
                type: Date,
                default: Date.now
            },
        }
    ]
})
const users = mongoose.model('users', userSchema)

module.exports = users; 