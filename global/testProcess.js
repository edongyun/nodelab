console.log('1. process start...');

// console.info(process.cwd());  // current working directory
// console.debug(process.argv);

// 이벤트 추가
process.on('exit', function(code){
  // console.log('cdoe : 0 = 정상 정료, 1 = error 발생');
  console.log('5. process 종료 직전에 처리할 작업...', code);

  setTimeout(function(){
    console.log('6. exit 리스터 내의 비동기 함수는 처리되지 않는다.');
  }, 1000);
});

try{
  a();  // 존재하지 않는 함수 호출
}catch(err){
  console.error(err.message);
}

setTimeout(function(){
  console.log('3. 1초 후 처리되는 비동기 함수');
  // process.exit(2);  // error code 2번으로 강제 종료
}, 1000);

setTimeout(function(){
  console.log('4. 1.5초 후 처리되는 비동기 함수');
}, 1500);

console.info('2. process end...');

