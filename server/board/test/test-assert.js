var assert = require('assert');

var a = 10;
var board = {writer: '김철수', title: '테스트'};
var result = {writer: '김철수', title: '테스트'};

console.log('테스트 시작.');

var failCount = 0;

try {
  assert(a == 10);
  console.log('1. pass');
} catch (error) {
  console.error('1. fail');
  failCount++;
}

try{
  assert(a++ == 11);
  console.log('2. pass');
}catch{
  console.error('2. fail');
  failCount++;
}

try {
  assert.equal(a, 11);
  console.log('3. pass');
} catch (error) {
  console.error('3. fail');
  failCount++;
}

// assert 모듈의 부족한 점
// 1. 하나라도 테스트를 성공하지 못하면 다음 테스트를 진행하지 않는다. 
// 2. 테스트를 독립적으로 실행하기 위해 try catch 코드를 작성해야 하는 불편함이 있다.
// 3. 비동기 함수의 테스트가 어렵다.

try {
  assert.equal(board, result);
  console.log('4. pass');
} catch (error) {
  console.error('4. fail');
  failCount++;
}

try {
  assert.deepEqual(board, result);
  console.log('5. pass');
} catch (error) {
  console.error('5. fail');
  failCount++;
}

// setTimeout(function(result){
//   assert.equal(Math.max(1, 5, 11), result);
//   console.log('6. pass');
// }, 1000, a);

// if(failCount == 0){
//   console.log('전체 테스트 통과');
// }else{
//   console.log('테스트 실패 '+ failCount);
// }

setTimeout(function(result){
  try {
    assert.equal(Math.max(1, 5, 10), result);
    console.log('6. pass');
  } catch (error) {
    console.error('6. fail');
    failCount++;
  }
  setTimeout(function(){
    try {
      assert.equal(a, 9);
      console.log('7. pass');
    } catch (error) {
      console.error('7. fail');
        failCount++;
    }
    if(failCount == 0){
      console.log('전체 테스트 통과');
    }else{
      console.log('테스트 실패 '+ failCount);
    }
  }, 500);
}, 1000, a);



