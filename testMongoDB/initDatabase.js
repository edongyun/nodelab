var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var fs = require('fs');
var clog = require("clog");
var jsonData = require('./testData');

const url = 'mongodb://localhost:27017';  // Connection URL
const dbName = 'dbTest';  // Database Name
var dbo;

// DB 접속
// Use connect method to connect to the server
MongoClient.connect(url, function(err, client){
  if (err) throw err;
  dbo = client.db(dbName);  // db 생성

  dropCollection();
  // createCollection();
  // insertData();
  // findData1();
  // findData2();
  // findData3();
  // findData4();

  // deleteData();

  client.close();
});

function dropCollection(){
  dbo.collection("students").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK);
    clog.log('succeed dropCollection.')
  });
}
function createCollection(){
  dbo.createCollection("students", function(err, res) {
    if (err) throw err;
    clog.log("Collection created!");
  });
}
function insertData(){
  dbo.collection("students").insertMany(jsonData, function(err, res) {
    if (err) throw err;
    clog.log('succeed insertData.');
    clog.log("Number of documents inserted: " + res.insertedCount);
  });
}
function findData1(){
  dbo.collection("students").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });
}
function findData2(){
  // find({검색조건}, {출력컬럼})
  dbo.collection("students").find({}, {_id:0, name: 1 }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });
}
function findData3(){
  // projection : 결과에 포함 할 필드
  dbo.collection("students").find({_id: 1}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });
}
function findData4(){
  // projection : 결과에 포함 할 필드
  dbo.collection("students").find({_id: {$gte: 5}}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });
}

function deleteData(){
  dbo.collection("students").deleteMany({}, function(err, obj) {
    if (err) throw err;
    console.log(obj.result.n + " document(s) deleted");
  });
}