const { MongoClient } = require('mongodb');
const config = require('config');

let db;

async function connectToDatabase() {
  const client = new MongoClient(config.get('mongodbUri'));
  await client.connect();
  db = client.db('threeJsStates');
  console.log('Connected to MongoDB');
}

function getDb() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

module.exports = { connectToDatabase, getDb };