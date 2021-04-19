const connection = require('./connection');
const { ObjectId } = require('mongodb');

const salesRegistration = async (sale) => {
  const result = await connection().then((db) => 
    db.collection('sales').insertOne({ itensSold: sale }));
  return result.ops[0];
};

const getSales = async () => {
  const result = await connection().then((db) =>
    db.collection('sales').find().toArray());
  return result;
};

const getSaleByID = async (id) => { // Como visto no PR de Rafael Machado Guimarães
  try {
    const result = await connection().then((db) =>
      db.collection('sales').findOne(ObjectId(id)));
    return result;
  } catch (error) {
    return null;
  }
};

module.exports = {
  salesRegistration,
  getSales,
  getSaleByID
};