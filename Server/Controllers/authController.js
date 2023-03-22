const jwt = require('jsonwebtoken');
const Users = require('../Models/userModel');
const sendMail = require('../Middlewares/manageEmailVerification');

// Utility methods.
const createMailHtml = require('../Utility/createMailHtml');
const addDefaultData = require('../Utility/addDefaultData');

const maxExpireTime = Number(process.env.MAX_EXPIRE_TIME);   // 3 Days.

const handleUserLogOut = async (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully.'})
}

const handleEmailVerification = async (req, res) => {
  const { _token } = req.query;
  try {
    const { _id } = await jwt.verify(_token, process.env.JWT_SECRET);
    const user = await Users.findOne({ _id });
    
    if(user) {
      if(user.verified) {
        return res.status(400).json({ error: 'This email is already verified, Please Login to continue.' });
      }
      const { username, email, password } = user;
      const updatedUser = await Users.findByIdAndUpdate(_id, { username, email, password, verified: true }); 
      if(!updatedUser) {
        return res.status(500).json({ error: 'Internal server error, unable to complete verification.' });
      }

      const newToken = await jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
      res.cookie('jwt', newToken, {
        httpOnly: true,
        secure: true,
        signed: true,
        sameSite: 'None',
        maxAge: maxExpireTime
      });

      // Add default recipes for newly created user.
      await addDefaultData(_id);

      return res.status(200).json(user);
    }
  }
  catch(error) {
    return res.status(401).json({ error: 'Verification link is either invalid or expired.' });
  }
  res.status(401).json({ error: 'Verification link is either invalid or expired.' });
}

const handleUserSignUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const { token } = await Users.signup(username, email, password);
    const mailHtml = createMailHtml(token, username);
    await sendMail(email, 'Email Verification For FoodFlame App.', mailHtml);
    res.status(200).json({ message: 'A confirmation mail is sent to your email, verify it to signup.' });
  } 
  catch(error) {
    let statusCode = 401;
    if(error.message.indexOf('mail') !== -1) {
      statusCode = 500;
    }
    res.status(statusCode).json({ error: error.message });
  }
}

const handleUserLogIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await Users.login(email, password);

    // Set token in user's cookie.
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      signed: true,
      sameSite: 'None',
      maxAge: maxExpireTime
    });

    res.status(200).json(user);
  } catch(error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = {
  handleUserLogOut,
  handleUserSignUp,
  handleUserLogIn,
  handleEmailVerification
};
