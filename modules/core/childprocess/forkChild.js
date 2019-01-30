console.log('forkChild 실행');

// parent가 send( )로 보낸 메세지를 'message' 이벤트로 받는다.
process.on('message', function(msg){
  console.log(msg);
});

// 3초 후에 자식이 부모에게 메세지를 보낸다.
setTimeout(function(){
  process.send('hi parent');
}, 1000*3);

