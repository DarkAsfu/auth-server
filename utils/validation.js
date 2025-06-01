const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const validatePassword = (password) => {
  return passwordRegex.test(password);
};

const validateShops = (shops) => {
  return shops && shops.length >= 3 && shops.every(shop => typeof shop === 'string' && shop.trim().length > 0);
};

module.exports = { validatePassword, validateShops };