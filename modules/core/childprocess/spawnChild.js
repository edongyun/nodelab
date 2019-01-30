var path = require('path');

// path.basename(__filename) : 파일명만 반환
var filename = path.basename(__filename);  

console.log(filename, '실행.');

// 5초가 소요되는 작업을 처리했다고 가정
setTimeout(function(){
  var result = 'from child';
  process.stdout.write(result);
}, 1000*5);

// 표준 입력장치로 데이터가 도착하면 콘솔로 넘김
process.stdin.on('data', function(data){
  console.log(data.toString());  // 출력 결과: hello child
});




