//클라이언트에서 넘어온 파일을 txt 파일에 작성하겠다.
//{flag: 'a'} : 넘어온 데이터를 끝에 이어서 출력
var file = require('fs').createWriteStream('output.txt', {flags: 'a'});

// pipe() 메소드를 이용해서 클라이언트의 메시지를 그대로 다시 보낸다.
var net = require('net').createServer(function(socket){
  socket.on('error', function(){});  // error 처리
  socket.pipe(socket);  // 받은 socket을 그대로 클라이언트로 보낸다.
  socket.pipe(file);  // 파일에 클라이언트에서 넘어온 데이터를 작성.
  socket.pipe(process.stdout);  // 서버쪽에 표준 출력
}).listen(4567);

