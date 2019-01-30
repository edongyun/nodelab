var net = require('net');
var os = require('os');
var fs = require('fs');
var path = require('path');

// server 객체 생성 및 인자값으로 connection listener 등록
var server = net.createServer(function(socket){
  // server쪽에서는 반드시 error 이벤트를 처리해야 한다.
  socket.on('error', function(){});

  // client의 요청이 있을 경우 호출
  socket.on('data', function(data){
    var msg = data.toString();
    console.log(`header msg:\n ${msg}`);  //header 전체 출력
    // console.log('header msg end\n');

    var req = {headers: {}};  // req : header의 정보를 저장할 객체
    console.log('0: req'+ req.headers+'\n');
    req.method = msg.split(os.EOL)[0].split(' ')[0];  // 줄바꿈을 기준으로 잘라내라낸 첫줄에서., space 기준으로 분할 = 'GET'
    req.url = msg.split(os.EOL)[0].split(' ')[1];     // '/'
    req.httpVersion = msg.split(os.EOL)[0].split(' ')[2];  // HTTP/1.1

    var headers = msg.split(os.EOL);  // // 원본 메시지를 줄바꿈 기준으로 잘라낸다.
    headers.shift();  // 맨 앞의 메시지('GET / HTTP/1.1')를 버림.
    for(var i=0; i<headers.length; i++){
      var header = headers[i].split(':');  //[Host: localhost, ...] 배열에서 header[0]='Host', header[1]='localhost'가 저장된다. 
      if(headers[i].trim().length > 0){
        var name = header[0].trim();   //name에 'Host' 저장, trim() 앞/뒤의 공백 제거
        var value = header[1].trim();  //value에 'localhost' 저장
        req.headers[name] = value;
      }
    }
    console.log(req.method, req.url, req.httpVersion);
    console.log(req.headers);
    console.log(req.headers['User-Agent']);

    if(req.url == '/'){
      req.url = '/index.html';
    }
    
    //index.html을 클라이언트의 브라우저에게 보내는 코드
    //path.join(__dirname, req.url) = c:\nodelab\server\net\index.html
    fs.readFile(path.join(__dirname, req.url), function(err, data){
      if(err){
        socket.write(req.httpVersion + '404 Not Found!' + os.EOL);
        socket.write('Content-Type: text/html;charset=utf-8' + os.EOL);
        socket.write(os.EOL);
        socket.end('<h1>지정한 파일을 찾을 수 없습니다.</h1>');
      }else{
        // 클라이언트에게 보내는 정보
        socket.write(req.httpVersion + '200 OK' + os.EOL);
        socket.write('Content-Type: text/html;charset=utf-8' + os.EOL);
        socket.write(os.EOL);  //header와 body 사이 줄바꿈
        socket.end(data);  //data에 index.html 텍스트가 들어있다.
      }
    });
  });
});

server.listen(80, function(){
  console.log('HTTP 서버 구동완료.');
});




