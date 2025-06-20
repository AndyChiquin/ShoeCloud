const client = require('../config/cassandra');

const createTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY,
      name TEXT,
      brand TEXT,
      category TEXT
    );
  `;

  try {
    await client.execute(query);
    console.log('✅ Tabla "products" verificada o creada en Cassandra.');
  } catch (error) {
    console.error('❌ Error creando/verificando la tabla en Cassandra:', error);
  }
};

module.exports = createTable;
