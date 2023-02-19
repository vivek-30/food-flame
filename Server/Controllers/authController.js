const Users = require('../Models/userModel');

const maxExpireTime = 3 * 24 * 60 * 60 * 1000;   // 3 Days.

const handleUserLogOut = async (req, res) => {
  const { jwt: token } = req.cookies;
  if(!token) {
    return res.status(401).json({ error: 'Logout failed (missing authentication token)' });
  }

  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully.'})
}

const handleUserSignUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const { user, token } = await Users.signup(username, email, password);

    // Set token in user's cookie.
    res.cookie('jwt', token, {
      maxAge: maxExpireTime,  
      httpOnly: true,
      // secure: true
    });
    
    res.status(200).json(user);
  } catch(error) {
    res.status(401).json({ error: error.message });
  }
}

const handleUserLogIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await Users.login(email, password);

    // Set token in user's cookie.
    res.cookie('jwt', token, {
      maxAge: maxExpireTime,
      httpOnly: true,
      // secure: true
    });

    res.status(200).json(user);
  } catch(error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = {
  handleUserLogOut,
  handleUserSignUp,
  handleUserLogIn
};
