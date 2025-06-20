const cassandra = require('cassandra-driver');
require('dotenv').config();

const client = new cassandra.Client({
  contactPoints: [process.env.CASSANDRA_HOST],
  localDataCenter: process.env.CASSANDRA_DATACENTER,
  keyspace: process.env.CASSANDRA_KEYSPACE,
});

module.exports = client;
