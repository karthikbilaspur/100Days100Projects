import { MongoClient } from 'mongodb';

const MONGO_URL = 'mongodb://localhost:27017';
const DATABASE_NAME = 'weather_app';
const COLLECTION_NAME = 'weather_data';

const client = new MongoClient(MONGO_URL);

const getWeatherDataCollection = async () => {
  await client.connect();
  const db = client.db(DATABASE_NAME);
  return db.collection(COLLECTION_NAME);
};

export default getWeatherDataCollection;