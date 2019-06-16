const db = {};

var MongoClient = require('mongodb').MongoClient;
var url = process.env.DATABASE_URI;

db.connect = () => {
  return MongoClient.connect(url, { useNewUrlParser: true }).then(
    client => {

      // The database name is part of the url.  client.db() seems 
      // to know that and works even without a parameter that 
      // relays the db name.
      let db = client.db();
      global.db = client.db(db.s.databaseName);
      return db;
    }
  );
};

module.exports = db;