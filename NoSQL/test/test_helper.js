const mongoose = require('mongoose')

const database = 'mongodb://127.0.0.1:27017/Learning-DB'

mongoose.connect(database).then(connection => {
    console.log('DB connected')
})


// to drop the database after each test

beforeEach((next) => {
    mongoose.connection.collections.students.drop();
    console.log('Database droped sucessfully');

    next()
})