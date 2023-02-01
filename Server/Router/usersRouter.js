const express = require('express');
const router = express.Router();

// Controllers For Managing Users Authentication.
const {
  handleUserSignUp,
  handleUserSignIn
} = require('../Controllers/authController');

// Handling All POST Requests.
router.post('/sign-up', handleUserSignUp);
router.post('/sign-in', handleUserSignIn);

module.express = router;
