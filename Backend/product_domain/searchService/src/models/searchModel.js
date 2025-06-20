// Aquí definimos funciones para consultas a Cassandra
const client = require('../config/cassandra');

const getProductsByKeyword = async (keyword) => {
  const query = 'SELECT * FROM products WHERE name CONTAINS ? ALLOW FILTERING';
  const result = await client.execute(query, [keyword], { prepare: true });
  return result.rows;
};

module.exports = {
  getProductsByKeyword,
};
