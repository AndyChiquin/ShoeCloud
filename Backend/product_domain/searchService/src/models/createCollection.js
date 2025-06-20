const { client } = require('../config/mongodb');

const createCollection = async () => {
  try {
    const db = client.db(process.env.MONGO_DB_NAME);
    const collections = await db.listCollections({ name: 'products' }).toArray();

    if (collections.length === 0) {
      await db.createCollection('products');
      console.log('✔️ Colección "products" creada');
    } else {
      console.log('✔️ Colección "products" ya existe');
    }
  } catch (err) {
    console.error('❌ Error al crear la colección:', err);
  }
};

module.exports = createCollection;
