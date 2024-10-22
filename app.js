const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes')
const blogRouter = require('./routes/blogRoutes')
app.use(express.json());


app.use('/users', userRouter)
app.use('/blogs', blogRouter)

module.exports = app;