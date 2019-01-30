var net = require('net');

// server 객체 생성 및 인자값으로 connection listener 등록
var server = net.createServer(function(socket){
  console.log('클라이언트가 접속함.', socket.remoteAddress);
  
  // server쪽에서는 반드시 error 이벤트를 처리해야 한다.
  socket.on('error', function(){});

  // socket은 읽고 쓰기가 모두 가능한 stream
  // 클라이언트가 data를 보내면 문자열로 출력.
  socket.on('data', function(data){
    console.log(data.toString());
    socket.write('Hi I am Server');
  });
});

server.listen(3456, function(){
  console.log('TCP 서버 구동완료.');
});




