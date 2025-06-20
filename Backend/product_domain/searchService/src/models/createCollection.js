const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_NAME;

async function createCollection() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB');

    const db = client.db(dbName);

    const collections = await db.listCollections({ name: 'products' }).toArray();
    if (collections.length > 0) {
      console.log('ℹ️ La colección "products" ya existe.');
    } else {
      await db.createCollection('products');
      console.log('✅ Colección "products" creada.');
    }
  } catch (error) {
    console.error('❌ Error al crear la colección:', error);
  } finally {
    await client.close();
  }
}

createCollection();
