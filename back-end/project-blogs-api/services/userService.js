const { User } = require('../models');
const { generateToken, decodeToken } = require('../auth');
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

const userLogin = async (login) => {
  const { email, password } = login;

  validationsHelper.emailExist(email);
  validationsHelper.passwordExist(password); 
  validationsHelper.emailIsEmpty(email);
  validationsHelper.passwordIsEmpty(password);

  const verifyEmail = await User.findOne({ where: { email } });
  validationsHelper.issoNonEcziste(verifyEmail);
  const { dataValues: { displayName } } = verifyEmail;

  const token = generateToken.create(displayName, email);
  return { token };
};

const getAllUsers = async () => {
  const result = await User.findAll();
  return result;
};

const getUserById = async (id) => {
  const result = await User.findOne({ where: { id } }); // findById???
  validationsHelper.userIdExist(result);
  return result;
};

const deleteUser = async (authorization) => {
  const { email } = decodeToken.decode(authorization);
  await User.destroy({ where: { email } });
  return true;
};

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
  getUserById,
  deleteUser,
};