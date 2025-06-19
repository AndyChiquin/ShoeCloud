const pool = require('../config/db');

const createInventoryTable = async () => {
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS inventory (
      id VARCHAR(36) PRIMARY KEY,
      product_id VARCHAR(36) NOT NULL,
      quantity INT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  try {
    const connection = await pool.getConnection();
    await connection.query(createTableSQL);
    connection.release();
    console.log('✔️ Tabla inventory verificada o creada.');
  } catch (error) {
    console.error('❌ Error creando/verificando tabla inventory:', error);
  }
};

module.exports = createInventoryTable;
