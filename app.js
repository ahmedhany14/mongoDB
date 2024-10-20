const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes')
app.use(express.json());


app.use('/users', userRouter)

module.exports = app;