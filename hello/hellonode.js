console.log('Hello Node');

function hello(name){
  return 'Hello ' + name;
}

//hello()함수를 모듈 호출의 결과로 return 한다.
module.exports.sayHello = hello;   

