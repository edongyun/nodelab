function print(msg){
  console.log(msg);
};

print('1. start');

setTimeout(print, 1000, '6. setTimeout');    // 일정 시간 후 실행
setInterval(print, 900, '5. SetInterval');   // 일정 시간마다 실행
setImmediate(print, '4. setImmediate');
process.nextTick(print, '3. process.nextTick');

print('2. finish');

