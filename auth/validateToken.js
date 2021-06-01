const jwt = require('jsonwebtoken');
require('dotenv').config();

const key = process.env.JWT_SECRET;

const tokenIsValid = (token) => {
  try {
    jwt.verify(token, key);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { tokenIsValid };