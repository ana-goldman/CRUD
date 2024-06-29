const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGO_URI;

async function renameCollection() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db(process.env.MONGO_DB_NAME);
    const oldCollectionName = 'Employees';
    const newCollectionName = 'employees';

    await database.collection(oldCollectionName).rename(newCollectionName);
    console.log(`Collection renamed from ${oldCollectionName} to ${newCollectionName}`);
  } catch (error) {
    console.error('Error renaming collection:', error);
  } finally {
    await client.close();
  }
}

renameCollection().catch(console.error);
