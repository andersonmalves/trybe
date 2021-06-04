const moment = require('moment');

const create = (nickname, chatMessage) => {
  const message = `${moment().format('DD-MM-YYYY HH:mm:ss A')} - ${nickname}: ${chatMessage}`;
  return message;
};

module.exports = { 
  create,
};