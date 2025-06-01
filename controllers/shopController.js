const Shop = require('../models/Shop');
const User = require('../models/User');

exports.getUserShops = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate('shops');
    res.status(200).json(user.shops);
  } catch (err) {
    next(err);
  }
};

exports.verifyShopAccess = async (req, res, next) => {
  try {
    const shopName = req.params.shopName.toLowerCase();
    const shop = await Shop.findOne({ name: shopName });
    
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    
    if (shop.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access to shop' });
    }
    
    res.status(200).json({ message: 'Access granted', shop });
  } catch (err) {
    next(err);
  }
};