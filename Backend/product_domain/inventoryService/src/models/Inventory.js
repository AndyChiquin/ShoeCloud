const pool = require('../config/db');

// ✅ SRP (Single Responsibility Principle - SOLID):
// This function is only responsible for creating or verifying the 'inventory' table.

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

    // ✅ KISS (Keep It Simple, Stupid):
    // Clear and minimal logic to ensure the table exists.
    console.log('✔️ Tabla inventory verificada o creada.');
  } catch (error) {
    console.error('❌ Error creando/verificando tabla inventory:', error);
  }
};

// ✅ Encapsulation:
// Function is exported as a module for use in the main app file.
module.exports = createInventoryTable;
