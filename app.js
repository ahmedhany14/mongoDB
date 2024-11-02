const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes')
const blogRouter = require('./routes/blogRoutes')
const movieRouter = require('./routes/moviesRouter')
const contactRouter = require('./routes/contactsRouter')
const sessionRouter = require('./routes/sessionRouter')
const geoRouter = require('./routes/geoRouter')
app.use(express.json());


app.use('/users', userRouter)
app.use('/blogs', blogRouter)
app.use('/movies', movieRouter)
app.use('/contacts', contactRouter)
app.use('/sessions', sessionRouter)
app.use('/geo', geoRouter)
module.exports = app;