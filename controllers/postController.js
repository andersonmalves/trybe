const { STATUS_CODE } = require('../helpers');
const { postService } = require('../services');

const createPost = async (request, response) => {
  try {
    const post = request.body;
    const { authorization } = request.headers;
    const result = await postService.createPost(post, authorization);
    response.status(STATUS_CODE.CREATED).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

const getAllPosts = async (request, response) => {
  try {
    const result = await postService.getAllPosts();
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

const getPostById = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await postService.getPostById(id);
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(error.status).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};