const { User } = require('../models');
const { generateToken } = require('../auth');
const { validationsHelper } = require('../helpers');

const createUser = async (newUser) => {
  validationsHelper.displayNameIsValid(newUser.displayName);
  validationsHelper.emailExist(newUser.email);
  validationsHelper.emailIsValid(newUser.email);
  validationsHelper.passwordExist(newUser.password);  
  validationsHelper.passwordIsValid(newUser.password);

  const { displayName, email } = newUser;
  const verifyEmail = await User.findOne({ where: { email } });
  validationsHelper.checkIfEmailExist(verifyEmail);

  await User.create(newUser);
  const token = generateToken.create(displayName, email);
  return { token };
};

module.exports = {
  createUser,
};