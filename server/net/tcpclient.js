var net = require('net');

// 접속할 대상 - 기존에 존재하는 웹 서버
var target = {
  host: 'localhost',  //google.com
  port: 3456          //80
};

// 클라이언트는 socket을 생성해야 한다.
var socket = new net.Socket();

// 필요하다면 error 이벤트 처리
socket.on('error', function(){});

// 서버에서 넘어오는 데이터를 받아서 출력
socket.on('data', function(data){
  console.log(data.toString());
});

// socket.connect(port[, host][, connectListener])
socket.connect(target.port, target.host, function(){
  console.log('서버 접속 성공.', target.host + ":" + target.port);
  socket.write('hello I am client.');
});

// process.stdin.resume();

// 표준 입력장치의 메시지를 서버로 전송
// 표준 입력에 'data' 이벤트가 발생하면, 
// socket을 이용해서 서버로 data를 전송
process.stdin.on('data', function(data){
  socket.write(data);
});

// 데이터를 수신하면 콘솔로 출력
socket.on('data', function(data){
  console.log(data.toString());
});




