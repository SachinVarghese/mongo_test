import express from 'express';
import http from 'http';
import bp from 'body-parser';
import { db } from './connect.js';
const app = express();
app.set('port',9000);
app.use(bp.json({limit: '10mb'}));
app.use(bp.text());
app.use(bp.urlencoded({extended: true}));
app.get("/add",(req,res)=>{
  let collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    console.log("Inserted 3 documents into the document collection");
    res.status(200).send(result);
  });
});
app.get("/update",(req,res)=>{
  let collection = db.collection('documents');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    console.log("Updated the document with the field a equal to 2");
    res.status(200).send(result);
  });
});
app.get("/delete",(req,res)=>{
  let collection = db.collection('documents');
  // Insert some documents
  collection.deleteOne({ a : 3 }, function(err, result) {
    console.log("Removed the document with the field a equal to 3");
    res.status(200).send(result);
  });
});
app.get("/",(req,res)=>{
  let collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    res.status(200).send(docs);
  });
});
http.createServer(app).listen(app.get('port'),()=>{
  console.log('Server running');
});
