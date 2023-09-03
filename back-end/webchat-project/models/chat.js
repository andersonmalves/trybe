const connection = require('./connection');

const clearMessages = async () =>
  connection().then((db) => db.collection('messages').deleteMany({}));

const saveMessage = async (message) => {
  connection().then((db) => db.collection('messages').insertOne(message));
};

const getAllMessages = async () =>
  connection().then((db) => db.collection('messages').find().toArray());

module.exports = {
  clearMessages,
  saveMessage,
  getAllMessages,
};