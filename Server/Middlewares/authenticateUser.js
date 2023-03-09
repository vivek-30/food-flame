const Users = require('../Models/userModel');
const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
  const { jwt: token } = req.signedCookies;

  if(!token) {
    return res.status(401).json({ message: 'Login or Signup to use this service.'});
  }

  try {
    const { _id } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findOne({ _id });

    if(!user) {
      throw Error('Authentication failed, try to login again.');
    }

    req.id = user._id;

    next();
  } catch(error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = authenticateUser;
