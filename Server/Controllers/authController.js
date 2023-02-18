const Users = require('../Models/userModel');

const maxExpireTime = 3 * 24 * 60 * 60 * 1000;   // 3 Days.

const handleUserSignUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const { user, token } = await Users.signup(username, email, password);

    // Set token in user's cookie.
    res.cookie('jwt', token, {
      maxAge: maxExpireTime,  
      httpOnly: true,
      secure: true
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
      secure: true
    });

    res.status(200).json(user);
  } catch(error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = {
  handleUserSignUp,
  handleUserLogIn
};
