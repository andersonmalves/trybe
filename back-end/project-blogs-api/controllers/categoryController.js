const { STATUS_CODE } = require('../helpers');
const { categoryService } = require('../services');

const createCategory = async (request, response) => {
  try {
    const { name } = request.body;
    const result = await categoryService.createCategory(name);
    response.status(STATUS_CODE.CREATED).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

const getAllCategories = async (request, response) => {
  try {
    const result = await categoryService.getAllCategories();
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};