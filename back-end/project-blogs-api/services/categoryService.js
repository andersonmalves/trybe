const { Categories } = require('../models');
const { validationsHelper } = require('../helpers');

const createCategory = async (name) => {
  validationsHelper.categoryNameExist(name);
  const result = await Categories.create({ name });
  return result;
};

const getAllCategories = async () => {
  const result = await Categories.findAll();
  return result;
};

module.exports = {
  createCategory,
  getAllCategories,
};