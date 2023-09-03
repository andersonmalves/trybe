const { STATUS_CODE } = require('../helpers');
const { userService } = require('../services');

const createUser = async (request, response) => {
  try {
    const newUser = request.body;
    const result = await userService.createUser(newUser);
    response.status(STATUS_CODE.CREATED).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

const userLogin = async (request, response) => {
  try {
    const login = request.body;
    const result = await userService.userLogin(login);
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

const getAllUsers = async (request, response) => {
  try {
    const result = await userService.getAllUsers();
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

const getUserById = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await userService.getUserById(id);
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

const deleteUser = async (request, response) => {
  try {
    const { authorization } = request.headers;
    await userService.deleteUser(authorization);
    response.status(STATUS_CODE.NO_CONTENT).send();
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  userLogin,
  getAllUsers,
  getUserById,
  deleteUser,
};