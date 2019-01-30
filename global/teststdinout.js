// 데이터가 입력될 때 발생하는 이벤트 처리
process.stdin.on('data', function(msg){
  console.log(msg);             // buffer에 담긴 바이너리 데이터
  console.log(msg.toString());  // string

  // 표준 출력(console.log()함수가 내부적으로 처리하는 작업)
  // process.stdout.write(msg.toString()+'\r\n');  
  process.stdout.write(msg.toString()+require('os').EOL); 
});

// process.stdin.on() 함수와 같다.
process.stdin.addListener('data', function(){});

// 입력을 한 번만 받는다.
process.stdin.once('data', function(){});











