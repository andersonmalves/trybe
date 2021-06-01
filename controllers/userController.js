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

module.exports = {
  createUser,
  userLogin,
};