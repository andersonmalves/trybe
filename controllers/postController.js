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

module.exports = {
  createPost,
};