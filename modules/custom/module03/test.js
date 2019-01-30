// require()의 결과는 module.exports의 객체가 반환된다.

var m1 = module.require('./m1');  // 사용자 정의 모듈 m1 require
// var m1 = require('./m1.json');  //내용이 고정인 json 파일을 require하는 경우

// console.log(typeof m1, m1);  // 결과값: object {} //m1.js에 내용이 없는 경우
// console.log(typeof m1, m1.name, m1.type);

// 함수(function)를 exprtrs하는 경우
var m2 = require('./m2');
console.log(typeof m2);
var kim = m2('김철수', 30);
var lee = m2('이영희', 25);
var hong = require('./m2')('홍길동', 40);  //바로 함수를 호출
console.log(kim.name, kim.age);
console.log(lee.name, lee.age);
console.log(hong.name, hong.age);



var m3 = require('./m3');  // return function
var kimScore = m3({kor: 100, eng: 90});
var leeScore = require('./m3')({kor: 90, eng: 80});
console.log(kimScore.sum(), kimScore.avg());  // 190 95
console.log(leeScore.sum(), leeScore.avg());  // 170 85


// 코어 모듈들은 여러 기능을 가진 객채를 exports하는 경우가 많다.
var http = require('./m4');
http.createServer(function(){});

var fs = require('./m4');
fs.readFile('hello.html', function(){});

var path = require('./m4');
path.join('test', 'hello.html');



// 범용적인 필요한 확장모듈에서 주로 사용하는 방식
var logger = require('./m5')({type: 'file', path: 'log.txt'});    //file에 log를 남기겠다.
var logger = require('./m5')({type: 'console'}); //console에 log를 남기겠다.
logger.log('접속 시작');
logger.log('접속중...');
logger.log('접속 완료');
