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

// Environment variables.
const port = process.env.PORT || 4000;
const databaseURI = process.env.DATABASE_URI;
const cookieSecret = process.env.COOKIE_SECRET;

// Configuration values.
const corsOptions = {
  origin: 'https://foodflame.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

// Applying middlewares.
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser(cookieSecret));

// Handling API routes.
app.use('/user', usersRouter);
app.use('/recipes', recipesRouter);

// Connecting to mongodb database using mongoose.
mongoose.set('strictQuery', false);
mongoose.connect(databaseURI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running at PORT: ${port}`);
    });
  })
  .catch((error) => console.log(error));
