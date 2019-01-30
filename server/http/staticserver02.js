var http = require('http');
var os = require('os');
var fs = require('fs');
var path = require('path');
var mimeTypes = require('mime');

 //요청 메시지를 파싱한 req, 응답 메시지를 손쉽게 만들어주는 res
var server = http.createServer(function(req, res){ 
  if(req.url == '/'){
    req.url = '/index.html';
  }

  var filename = path.join(__dirname, req.url);
  var extname = path.extname(filename).substring(1);  //확장자 꺼내오기
  var mimeType = mimeTypes.getType(extname);

  fs.readFile(filename, function(err, data){
    if(err){
      res.writeHead(404, {'Content-Type' : 'text/html; charset=utf-8'});
      res.end('<h1>지정한 파일을 찾을 수 없습니다.</h1>');
    }else{
      res.writeHead(200
        , {'Content-Type': mimeType + ';charset=utf-8'});
      res.end(data);
    }
  });
});

server.listen(80, function(){
  console.log('HTTP 서버 구동완료.');
});





