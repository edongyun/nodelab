/*
var b1 = {
		_id: 0,
		title: '첫번째 게시물',
		writer: '김철수',
		content: '첫번째 게시물 입니다.',
		view: 0,
		regdate: '2099-06-20 12:34'
};
var b2 = {
		_id: 1,
		title: '두번째 게시물',
		writer: '이영희',
		content: '두번째 게시물 입니다.',
		view: 0,
		regdate: '2099-06-21 12:54'
};

var boardList = [b1, b2];
*/

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'; // Connection URL
const dbName = 'boardDB'; // Database Name

var db;
var client;
// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true }, function(err, result) {
  console.log("Connected successfully to server");
  client = result;
  db = client.db(dbName);
  db.board = db.collection('board');
  db.seq = db.collection('seq');
  console.log('DB 접속 완료');
});

module.exports = {
	list: function(cb){
    // TODO: DB에서 목록 조회 후 결과를 콜백으로 전달
    //find()까지만 하면 cursor객체가 나온다. 그래서 toArray로 배열로 만든다.
    db.board.find({}, {content: 0}).sort({_id: -1}).toArray(function(err, result){
      cb(result);
    });  
    // cb(boardList);
  },
	show: function(no, cb){
    // TODO: DB에서 상세 정보 조회 후 결과를 콜백으로 전달
    db.board.findOneAndUpdate({_id: no}, {$inc: {view: 1}}, function(err, result){
      cb(result.value);
    });
    // cb(boardList[no]);
  },
	create: function(board, cb){
    db.seq.findOneAndUpdate({}, {$inc: {seq: 1}});
    cb(1);
  },
	remove: function(no, cb){
    cb();
  },
  close: function(){
    client.close();
  }
};