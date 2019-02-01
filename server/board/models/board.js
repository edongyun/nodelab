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

var dateFormat = require('date-format');  // date를 넘기면 지정한 포멧으로 넘겨주는 모듈

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'; // Connection URL
const dbName = 'boardDB'; // Database Name

var db;
var client;
// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true, poolSize: 10 }, function(err, result) {
  console.log("Connected successfully to server");
  client = result;
  db = client.db(dbName);
  db.board = db.collection('board');
  db.seq = db.collection('seq');
  console.log('DB 접속 완료');
});

module.exports = {
	list: function(cb, page){
    page = page || 1;  //page 번호가 있으면 사용하고 없으면 1로
    // TODO: DB에서 목록 조회 후 결과를 콜백으로 전달
    //find()까지만 하면 cursor객체가 나온다. 그래서 toArray로 배열로 만든다.
    db.board.find({}, {content: 0})
            .sort({_id: -1})
            .skip((page-1)*10)  // 10개씩 건너띄기
            .limit(10)          // 한 페이지 10개만
            .toArray(function(err, result){
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
    db.seq.findOneAndUpdate({}, {$inc: {seq: 1}}, function(err, result){
      board._id = result.value.seq;
      board.view = 0; // 조회수 초기값
      board.regdate = dateFormat.asString('yyyy-MM-dd hh:mm', new Date());   // 등록 날짜
      db.board.insertOne(board, function(){
        cb(board._id);
      });
    });
    // cb(1);
  },
	remove: function(no, cb){
    db.board.deleteOne({_id: no}, function(err, result){
      // console.log(result);
      cb();
    });
    // cb();
  },
  close: function(){
    client.close();
  }
};
