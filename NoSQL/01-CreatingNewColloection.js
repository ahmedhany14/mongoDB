const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({ path: './../.config.env' })

const database = process.env.DATABASE;
console.log(`database url connection : ${database}`)

// Create a connection
mongoose.connect(database, {}).then(connection => {
    console.log('DB connection successful');
})


// 1) Create new Schema 
/*
in each instance there is some options that we can use like:
    .1 type
        use to define the type of the field (String, Number, Date, etc)
    .2 required
        used to define if the field is required or not (true, false)
    .3 default
        used to define the default value of the field
    .4 unique
        used to define if the field is unique or not (true, false)
    .5 enum
        used to define the possible values of the field (['value1', 'value2', 'value3'])
    .6 min & max
        used to define the minimum and maximum value of the field
    .7 trim
        used to remove the white spaces from the beginning and the end of the string
    .8 lowercase & uppercase
        used to convert the string to lowercase or uppercase (true, false)
    .9 match
        used to define the regex pattern that the string should match
    .10 message
        used to define the custom error message, if the value of the field is invalid
    .11 index
        used to define the index of the field

*/
const bookstore = new mongoose.Schema({
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


// 2) model the Schema in the data base
const books = mongoose.model('books', bookstore);
books.create();

