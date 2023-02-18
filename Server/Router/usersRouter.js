const express = require('express');
const router = express.Router();

// Controllers for managing users authentication.
const {
  handleUserSignUp,
  handleUserLogIn
} = require('../Controllers/authController');

// Middlewares.
const validateCredentials = require('../Middlewares/validateCredentials');

// Applying Middlewares.
router.use(validateCredentials);

// Handling all POST requests.
router.post('/sign-up', handleUserSignUp);
router.post('/log-in', handleUserLogIn);

module.exports = router;
