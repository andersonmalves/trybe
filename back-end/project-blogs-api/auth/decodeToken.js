require('dotenv').config();
const jwt = require('jsonwebtoken'); 

const key = process.env.JWT_SECRET;

const decode = (token) => {
  const result = jwt.verify(token, key); 
  return result;
};

module.exports = { 
  decode,
};