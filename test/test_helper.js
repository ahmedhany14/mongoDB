const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const database = process.env.DATABASE
console.log('database', database)


// will be run after all the tests and will be runns exaclty once
before((next) => {
    mongoose.connect(database).then(connection => {
        console.log('DB connected')
        next();
    }).catch((err) => {
        console.warn('warning', err)
    })
})

// will be run after each test
beforeEach((next) => {
    console.log('Drop usrs');
    mongoose.connection.collections.users.drop(() => { });
    console.log('Drop usrs2');
    mongoose.connection.collections.users2.drop(() => { });
    next();
})