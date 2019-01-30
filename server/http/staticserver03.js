var http = require('http');
var os = require('os');
var fs = require('fs');
var path = require('path');
var mimeTypes = require('mime');  //요청 파일의 확장자에 따라 알맞은 type을 반환

// 로그 파일,  {flags: 'a'} = append 모드
var logfile = fs.createWriteStream('log.txt', {flags: 'a'});  

// connection listener 등록
//요청 메시지를 파싱한 req, 응답 메시지를 손쉽게 만들어주는 res
var server = http.createServer(function(req, res){ 
  if(req.url == '/'){
    req.url = '/index.html';
  }

  var filename = path.join(__dirname, req.url);
  var extname = path.extname(filename).substring(1);  //확장자 꺼내오기
  var mimeType = mimeTypes.getType(extname);

  // 지정한 filename의 상태 정보를 반환 , 파일인지 디렉토리인지 구분한다.
  fs.stat(filename, function(err, status){  
    if(err){
      res.writeHead(404, {'Content-Type' : 'text/html; charset=utf-8'});
      res.end('<h1>지정한 파일을 찾을 수 없습니다.</h1>');
    }else if(status.isFile()){
      res.writeHead(200, {'Content-Type': mimeType + ';charset=utf-8'});
      // 지정한 파일을 읽기 위한 readable stream 생성 빨대를 꼳았음.
      fs.createReadStream(filename).pipe(res);  //buffer만큼 차면 보내고, 다시 채우고 보내고로 효율적
    }else{
      res.writeHead(403, {'Content-Type' : 'text/html; charset=utf-8'});
      res.end('<h1>디렉토리 접근이 허용되지 않습니다.</h1>');
    }

    // 로깅 메세지 출력 (시간, 상태코드, url)
    logfile.write('[' + Date() + ']'+ res.statusCode + ' ' + req.url);
    logfile.write(`[${Date}] ${res.statusCode} ${req.url}`);
    logfile.write(require('os').EOL)  // 줄바꿈 기호
  });  
});
var port = process.argv[2] || 80;  //port가 있으면 사용하고, 생략되어 있으면 80으로
console.log(process.argv[2]);
server.listen(80, function(){
  console.log('HTTP 서버 구동완료.');
});





