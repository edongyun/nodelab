function chat(io){
  var userList = {};  // 접속한 사용자 목록 저장할 객체
  io.on('connection', function(ws){
    ws.on('login', function(nickname){
      userList[nickname] = ws;
      ws.nickname = nickname || 'Guest';  // 소켓 객체에 nickname 저장
      io.emit('chat', `시스템: ${ws.nickname}님이 입장했습니다.`);  // 이벤트 emmit에서 이벤트를 발생시킬 때는 emit() 사용, 읽을 때는 on, 보낼 때는 emit
    });          // login event
    ws.on('chat', function(msg){
      io.emit('chat', `${nickname}: ${msg}`);
    });           // chat event
    ws.on('disconnect', function(){
      io.emit('chat', `시스템: ${ws.nickname}님이 나갔습니다.`); 
    });     // disconnect event
  });
}

module.exports = chat;