const { BlogPosts, User, PostsCategories, Categories } = require('../models');
const { decodeToken } = require('../auth');
const { validationsHelper } = require('../helpers');

const createPost = async (post, authorization) => {
  const decodedToken = decodeToken.decode(authorization);
  const { email } = decodedToken;
  const { id } = await User.findOne({ where: { email } });

  const { title, content, categoryIds } = post;
  validationsHelper.titleExist(title);
  validationsHelper.contentExist(content);
  validationsHelper.categoryExist(categoryIds);
  
  const newPost = { title, content, userId: id, published: Date.now(), updated: Date.now() };
  const result = await BlogPosts.create(newPost);
  
  // Source: https://github.com/tryber/sd-07-project-blogs-api/blob/derkian-ds-07-project-blogs-api/services/postServices.js
  const allCategories = await Categories.findAll({ where: { id: categoryIds } });
  validationsHelper.checkIfCategoryAlreadyExist(allCategories, categoryIds); 

  // const result = await BlogPosts.findAll();

  categoryIds.forEach(async (categoryId) => {
    await PostsCategories.create({ postId: result.id, categoryId });
  });

  return result;
};

const getAllPosts = async () => {
  const result = await BlogPosts.findAll({
    include: [{
        model: User,
        as: 'user',
        attributes: {
          exclude: ['password'],
        },
      },
      {
        model: Categories,
        as: 'categories',
        through: {
          attributes: [],
        },
      }],
  });
  return result;
};

const getPostById = async (id) => {
  const result = await BlogPosts.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  validationsHelper.checkIfPostWasReturned(result);
  return result;
};

const updatePost = async (id, post, authorization) => {
  const decodedToken = decodeToken.decode(authorization);
  const { dataValues: { email } } = await User.findOne({ where: { id } });
  validationsHelper.checkOwnerPost(decodedToken, email);
  const { title, content, categoryIds } = post;
  validationsHelper.checkIfExistcategoryIds(categoryIds);
  validationsHelper.titleExist(title);
  validationsHelper.contentExist(content);
  await BlogPosts.update({ title, content }, { where: { id } });
  const result = await BlogPosts.findOne({
    where: { id },
    attributes: { exclude: ['id', 'published', 'published'] },
    include: [
      { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
  });
  return result;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};