const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'User Name Is Required.']
  },
  password: {
    type: String,
    required: [true, 'Password Is Required.']
  }
});

module.exports = mongoose.model('User', userSchema);
