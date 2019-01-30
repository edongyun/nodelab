var EventEmitter = require('events');

class MyEmitter extends EventEmitter{

}

var myEmitter = new MyEmitter();
// 'event1'이라는 이름의 이벤트 등록
myEmitter.addListener('event1', print);
myEmitter.on('event1', print);
myEmitter.once('event1', print);

// 'event1' 이벤트 발생시키기
myEmitter.emit('event1', 'hello');
myEmitter.emit('event1', 'hello2');


function print(msg){
  console.log(msg);
}

