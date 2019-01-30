var childProcess = require('child_process');
var path = require('path');
var fs = require('fs');  // 파일이 수정되었는지 체크할 용도

// node.exe mymon.js staticserver03.js 8080
// node staticserver03.js 8080
var argv = process.argv.slice(3);  // [8080]을 꺼낸다.
var file = path.join(__dirname, process.argv[2]);  // staticserver03.js
var filename = path.basename(file);  // 경로 빼고 파일명만 꺼내온다.

var child;
function runChild(){
  child = childProcess.fork(file, argv);
  console.log('running node', filename, argv);
  // 자식과의 연결이 끊어지면
  child.on('close', function(){
    console.log('stop', filename);
  });
}

// 파일의 내용이 수정되었는지 감시.
// 자식 프로세스를 죽이고, 1초 뒤 자식 프로세스 재시작
fs.watchFile(file, function(curr, prev){
  if(child) child.kill();
  setTimeout(runChild, 1000);
});

runChild();















