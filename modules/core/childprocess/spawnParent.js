var childProcess = require('child_process');

// childProcess.execFile('calc.exe');  // 윈도우 계산기 프로그램 실행

//  // 지정한 프로세스를 실행하는 기능, 메모장 실행
// childProcess.spawn('notepad.exe'); 

 // spawn(command[, args][, options])
 // node.exe로 spawnChild.js를 실행해라.
var child = childProcess.spawn('node.exe', ['spawnChild.js'], {
  // 1. 자식이 실행한 코드를 부모의 콘솔에서 확인
  // stdio: 'inherit'  //부모 프로세스의 표준 입출력 장치를 상속

  // 2. [stdin, stdout, stderr]
  // stdio: ['inherit', 'inherit', 'inherit']

  // 3. 자식 프로세스의 표준입출력 장치를 사용 안함.
  // stdio: 'ignore' 

  // 4. 부모 프로세스의 표준 입출력 장치를 생성된 childProcess 장치에 pipe 연결
  stdio: 'pipe'
});

// 윈도우 명령프롬프트의 dir 결과를 console에서 확인할 수 있다.
var child = childProcess.spawn('cmd.exe');
child.stdin.write('dir\r\n');

// 자식의 표준출력이 발생한 경우
child.stdout.on('data', function(data){
  console.log(data.toString());  // 출력 결과: from child
});

// 부모가 자식에게 데이터를 보내는 경우
// child.stdin.write('hello child');

