// socket 생성과 동시에 연결
var net = require('net').createConnection(4567, 'localhost');

// 표준 입력에 socket을 연결하고 다시 표준 출력
process.stdin.pipe(net).pipe(process.stdout);

