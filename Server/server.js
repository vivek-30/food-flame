const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Route handlers
const usersRouter = require('./Router/usersRouter');
const recipesRouter = require('./Router/recipesRouter');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
const DATABASE_URI = 'mongodb://localhost:27017';
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

// Applying middlewares.
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Handling api requests.
app.use('/user', usersRouter);
app.use('/recipes', recipesRouter);

// Connecting to mongodb database using mongoose.
mongoose.set('strictQuery', false);
mongoose.connect(DATABASE_URI)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server is Running at PORT: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
