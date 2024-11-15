const express = require('express');
const userRouter = require('./routes/users')
const showRouter = require('./routes/shows');

const { User, Show } = require('./models/index');
const app = express();


app.use(express.json());
app.use('/users', userRouter);
app.use('/shows', showRouter);

module.exports = app;
