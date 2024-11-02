const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE;


const connect_to_db = async () => {
    try {
        await mongoose.connect(DB, {});
        console.log('Database connected successfully')
    }
    catch (error) {
        console.log(error.message)
    }
}


connect_to_db()

const app = require('./app')
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`api url: 127.0.0.1:${PORT}`);
})