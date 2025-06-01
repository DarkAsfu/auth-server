const User = require('../models/User');
const Shop = require('../models/Shop');
const { generateToken, setTokenCookie } = require('../utils/token');
const { validatePassword, validateShops } = require('../utils/validation');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res, next) => {
  try {
    const { username, password, shops } = req.body;
    console.log(username, password, shops)
    if (!username || !password || !validateShops(shops)) {
      return res.status(400).json({ message: 'All fields are required with at least 3 shops' });
    }
    
    if (!validatePassword(password)) {
      return res.status(400).json({ 
        message: 'Password must be 8+ chars with one number and one special character'
      });
    }
    
    const existingShops = await Shop.find({ name: { $in: shops.map(s => s.toLowerCase()) } });
    if (existingShops.length > 0) {
      return res.status(400).json({ 
        message: `Shop name(s) already taken: ${existingShops.map(s => s.name).join(', ')}`
      });
    }
    
    const user = await User.create({ username, password });
    
    const createdShops = await Shop.insertMany(
      shops.map(shopName => ({ name: shopName.toLowerCase(), owner: user._id }))
    );
    
    user.shops = createdShops.map(shop => shop._id);
    await user.save();
    
    const token = generateToken(user._id);
    setTokenCookie(res, token);
    
    res.status(201).json({ 
      message: 'User created successfully',
      token,
      user: { id: user._id, username: user.username }
    });
  } catch (err) {
    console.error("Error:", err);
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { username, password, rememberMe } = req.body;
    
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    
    const token = generateToken(user._id, rememberMe ? '7d' : '30m');
    setTokenCookie(res, token, rememberMe);
    
    res.status(200).json({ 
      message: 'Login successful',
      token,
      user: { id: user._id, username: user.username, shops: user.shops }
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token', { domain: '.localhost' });
  res.status(200).json({ message: 'Logged out successfully' });
};