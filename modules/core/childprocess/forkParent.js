var childProcess = require('child_process');

// node 프로세스를 실행한다. (node 프로세스 전용)
// spawn()과 다른점: 자식 프로세스와 통신할 수 있는 전용 IPC 채널을 만든다.
var child = childProcess.fork('forkchild.js');
// var child = childProcess.spawn('node.exe', ['forkchild.js'], {stdio: 'inherit'});

child.send('hello child');
child.on('message', function(msg){
  console.log(msg);
  // 'message' 이벤트가 등록되면 언제 message가 올지 알 수 없기 때문에 프로세스가 유지된다.

  //IPC 채널 닫기
  child.disconnect();
});  

//자식 프로세스의 종료 여부 확인
child.on('exit', function(code){
  console.log('자식 프로세스 종료됨.', code);
});

// 표준입력장치로 데이터를 받는다고 하면 프로세스는 중지되지 않는다.
process.stdin.on('data', function(){});









