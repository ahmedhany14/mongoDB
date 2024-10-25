const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes')
const blogRouter = require('./routes/blogRoutes')
const movieRouter = require('./routes/moviesRouter')
app.use(express.json());


app.use('/users', userRouter)
app.use('/blogs', blogRouter)
app.use('/movies', movieRouter)

module.exports = app;