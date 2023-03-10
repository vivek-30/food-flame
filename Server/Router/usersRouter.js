const express = require('express');
const router = express.Router();

// Controllers for managing users authentication.
const {
  handleUserLogOut,
  handleUserSignUp,
  handleUserLogIn,
  handleEmailVerification
} = require('../Controllers/authController');

// Middlewares.
const validateCredentials = require('../Middlewares/validateCredentials');

// Handling all GET requests.
router.get('/log-out', handleUserLogOut);
router.get('/verify', handleEmailVerification);

// Applying Middlewares.
router.use(validateCredentials);

// Handling all POST requests.
router.post('/sign-up', handleUserSignUp);
router.post('/log-in', handleUserLogIn);

module.exports = router;
