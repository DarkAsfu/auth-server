const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const shopController = require('../controllers/shopController');

router.get('/', auth, shopController.getUserShops);
router.get('/verify/:shopName', auth, shopController.verifyShopAccess);

module.exports = router;