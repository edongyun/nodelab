var childProcess = require('child_process');

// child_process.exec(command[, options][, callback])
// spawn() 명령으로 쉘을 실핸한 후 쉘에 command를 전달한다.
// 쉘의 출력이 완료되면 콜백 함수를 호출한다.
childProcess.exec('dir', function(err, stdoutMsg, stderrMsg){
  if(err) console.error(err);
  console.log(stdoutMsg);
});

// 쉘을 생성하지 않고 지정한 파일을 실행한다. - 계산기 실행
childProcess.exec('calc', function(err, stdoutMsg, stderrMsg){
  if(err) console.error(err);
  console.log(stdoutMsg);
});

