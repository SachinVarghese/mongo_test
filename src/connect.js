const MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/mongo_test';
export let db={};
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, dbObj) {
  console.log("Connected correctly to server");
  db=dbObj;
  // dbObj.close();
});
