var http = require('http');
var os = require('os');
var fs = require('fs');
var path = require('path');

 //요청 메시지를 파싱한 req, 응답 메시지를 손쉽게 만들어주는 res
var server = http.createServer(function(req, res){ 
  console.log(req.method, req.url, req.httpVersion);
  console.log(req.headers);
  console.log(req.headers['User-Agent']);

  if(req.url == '/'){
    req.url = '/index.html';
  }
  fs.readFile(path.join(__dirname, req.url), 
  function(err, data){
    if(err){
      res.writeHead(404);
      res.end('<h1>지정한 파일을 찾을 수 없습니다.</h1>');
    }else{
      res.writeHead(200);
      res.write('Content-Type: text/html;charset=utf-8');
      res.end(data);
    }
  });
});

server.listen(80, function(){
  console.log('HTTP 서버 구동완료.');
});





