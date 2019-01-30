// 8124 포트로 클라이언트 통신을 수신하는 소캣을 가진 TCP 서버
var net = require('net');

var server = net.createServer(function(conn) {
   console.log('connected');

   conn.on('data', function (data) {
      console.log(data + ' from ' + conn.remoteAddress + ' ' +
        conn.remotePort);
      conn.write('Repeating: ' + data);
   });

   conn.on('close', function() {
        console.log('client closed connection');
   });

   conn.on('error', function(){
      console.log('클라이언트와 연결이 끊김.')
   });

}).listen(8124);

console.log('listening on port 8124');
