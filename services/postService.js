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
    console.log(categoryId);
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

module.exports = {
  createPost,
  getAllPosts,
};