const moment = require('moment');
const { chatModel } = require('../models');

const create = (nickname, chatMessage) => {
  const timestamp = moment().format('DD-MM-YYYY HH:mm:ss A');
  chatModel.saveMessage({ message: chatMessage, nickname, timestamp });
  const message = `${timestamp} - ${nickname}: ${chatMessage}`;
  return message;
};

module.exports = {
  create,
};