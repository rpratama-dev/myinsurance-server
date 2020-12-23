const mongodb = require('mongodb');

const { MongoClient } = mongodb;
const dbName = 'myinsurance';
const uri = process.env.CONFIG_ATLAS || 'mongodb://localhost:27017';

let database;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function connect(callback) {
  client.connect((err) => {
    if (err) {
      callback('connection to mongodb failed');
    } else {
      console.log('succesfully connect to mongodb');
      database = client.db(dbName);
      callback(null);
    }
  });
}

function getDatabase(collection) {
  return database.collection(collection);
}

module.exports = { connect, getDatabase };
