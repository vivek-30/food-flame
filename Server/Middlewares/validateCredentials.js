const validator = require('validator');

const validateCredentials = (req, res, next) => {
  const { username, email, password } = req.body;
  let error = '';

  // Check if credentials are empty or not.
  if(username && validator.isEmpty(username, { ignore_whitespace: true })) {
    error = 'Username can not be an empty field.';
  }

  if(validator.isEmpty(email, { ignore_whitespace: true })) {
    error = 'Email can not be an empty field.';
  }

  if(validator.isEmpty(password, { ignore_whitespace: true })) {
    error = 'Password can not be an empty field.';
  }

  // Check for correctness of email string.
  if(!validator.isEmail(email)) {
    error = 'Email must be valid.';
  }

  // Check password strength.
  if(!validator.isStrongPassword(password)) {
    error = 'Password is not strong (Make sure it is atleast 8 characters long containing atleast one lowercase, uppercase, digit and special character)';
  }

  // Check if username is valid or not.
  if(username && !validator.matches(username, /^[A-Za-z][\w_]{2,19}$/)) {
    error = 'Username is not valid. (Must be alphanumeric and atleast 3 characters long string including "_". But must begin with a letter';
  }

  if(error !== '') {
    return res.status(401).json({ error });
  }

  // Everything is fine, continue authentication process.
  next();
}

module.exports = validateCredentials;
