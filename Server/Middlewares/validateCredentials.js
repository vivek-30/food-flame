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
    error = 'Invalid email.';
  }

  // Check password strength.
  if(!validator.isStrongPassword(password)) {
    error = 'Make sure your password is atleast 8 characters long containing atleast one lowercase, uppercase, digit and a special character.';
  }

  // Check if username is valid or not.
  if(username && !validator.matches(username, /^[A-Za-z][\w\s_-]{2,19}$/)) {
    error = 'Invalid username. (Must be alphanumeric and atleast 3 characters long including "_", "-" and "space". But must begin with a letter';
  }

  if(error !== '') {
    return res.status(401).json({ error });
  }

  // Everything is fine, continue authentication process.
  next();
}

module.exports = validateCredentials;
