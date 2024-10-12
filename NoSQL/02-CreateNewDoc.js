const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({ path: './../.config.env' })

const database = process.env.DATABASE;
console.log(`database url connection : ${database}`)

// Create a connection
mongoose.connect(database, {}).then(connection => {
    console.log('DB connection successful');
})
bookstore = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        message: "book name is required"
    },
    price: {
        type: Number,
        min: 100,
        max: 1000,
        default: 500
    },
    auther: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        messege: 'auther name is required'
    },
    creationDate: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: String,
        enum: ['fiction', 'non-fiction', 'comedy', 'drama'],
        lowercase: true,
        message: "Category isn't valid"
    },
    rataings: {
        type: Number,
        default: 0
    },
    rataingsAVG: {
        type: Number,
        default: 0
    }
});
const books = mongoose.model('books', bookstore);


const book = {
    name: `Mohamed's Book   `,
    price: 900,
    auther: `Ahmed hany`,
    category: 'comedy',
    rataings: 5,
    rataingsAVG: 4.6
}


const createIns = async (book) => {
    try {
        await books.create(book);
    } catch (err) {
        console.log(err.message)
    }
}

createIns(book)