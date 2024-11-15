const app = require('./app');
const port = 3000;
const {db} = require('./db/connection');
const { User, Show } = require('./models/index');   
const express = require("express");

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/shows`);
});