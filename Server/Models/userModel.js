const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, 'This username is already taken.'],
    required: [true, 'Username is required to signup.']
  },
  email: {
    type: String,
    unique: [true, 'This email is already registered.'],
    required: [true, 'Email is required to signup.']
  },
  password: {
    type: String,
    required: [true, 'Password is required to signup.']
  }
});

// Static methods.
userSchema.statics.signup = async function(username, email, password) {

  // Check whether a user is already exist or not with given username and email.
  const isUserExist = await this.findOne({ username });
  if(isUserExist) {
    throw Error('Unable to signup as user already exists.');
  }

  const isEmailExist = await this.findOne({ email });
  if(isEmailExist) {
    throw Error('Unable to signup as email already registered.');
  }

  // Hash password using "bcrypt".
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  // Try to save user to database.
  const user = await this.create({
    username,
    email,
    password: hashedPassword
  });

  if(!user) {
    throw Error('Internal Error, unable to signup.');
  }

  // Create token using "jsonwebtoken".
  const token = await jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '3d' });
  return { user, token };
}

userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if(!user) {
    throw Error('This email is not registered yet.');
  }

  // Compare given password with stored hashed password.
  const isMatching = await bcrypt.compare(password, user.password);
  if(!isMatching) {
    throw Error('Login failed, incorrect password.');
  }

  // Create token using "jsonwebtoken".
  const token = await jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '3d' });
  return { user, token };
}

module.exports = mongoose.model('User', userSchema);
