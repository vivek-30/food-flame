const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
require('dotenv').config();

const recipesRouter = require('./Router/recipesRouter');
const usersRouter = require('./Router/recipesRouter');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
const DATABASE_URI = process.env.DATABASE_URI;

app.use(express.json());
app.use(recipesRouter);
app.use(usersRouter);

mongoose.set('strictQuery', false);

mongoose.connect(DATABASE_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is Running at PORT: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
