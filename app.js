const express = require('express');
const userRouter = require('./routes/users')
const showRouter = require('./routes/shows');

const { User, Show } = require('../models');
const app = express();


app.use(express.json());
app.use('movies', userRouter);
app.use('shows', showRouter);

module.exports = app;
