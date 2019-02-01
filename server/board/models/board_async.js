var dateFormat = require('date-format');  // date를 넘기면 지정한 포멧으로 넘겨주는 모듈

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
	list: async function(cb){
    // TODO: DB에서 목록 조회 후 결과를 콜백으로 전달
    // async와 await 키워드를 이용하면 비동기함수가 동기함수가 된다.
    var result = await db.board.find({}, {content: 0}).sort({_id: -1}).toArray();  
    return result;
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
      console.log(result);
      cb();
    });
    // cb();
  },
  close: function(){
    client.close();
  }
};
