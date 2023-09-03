const jwt = require('jsonwebtoken');
require('dotenv').config();

const password = process.env.JWT_SECRET;

const create = (name, email) => {
  const userObj = {
    name,
    email,
  };

  const header = {
    algorithm: 'HS256',
    expiresIn: 60 * 60 * 4,
  };

  const token = jwt.sign(userObj, password, header);
  return token;
};

module.exports = { create };
