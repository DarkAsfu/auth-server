const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (userId, expiresIn = '30m') => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

const setTokenCookie = (res, token, rememberMe = false) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    domain: '.localhost'
  };
  
  if (rememberMe) {
    cookieOptions.maxAge = 7 * 24 * 60 * 60 * 1000;
  }
  
  res.cookie('token', token, cookieOptions);
};

module.exports = { generateToken, verifyToken, setTokenCookie };