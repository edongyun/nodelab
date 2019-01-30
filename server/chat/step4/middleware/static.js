var os = require('os');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');  
var url = require('url'); 
var mimeTypes = require('mime');

// 정적인 자원을 응답하는 기능
// connect의 미들웨어가 되기위한 조건
// 1. req, res, next를 매개변수를 갖는 함수.
// 2. 처리할 작업을 처리한 후 둘 중 하나를 처리.
//  2-1 브라우저에 응답을 보낸다.
//  2-2 다음(next) 미들웨어를 호출한다. 
function staticServer(req, res, next){
  if(req.url == '/'){
    req.url = '/index.html';
  }

  var parseUrl = url.parse(req.url);
  var pathname = parseUrl.pathname;  // ?앞 부분
  var query = qs.parse(parseUrl.query);        // ?뒷 부분 parseUrl.query;

  var filename = path.join(base, pathname);
  var extname = path.extname(filename).substring(1);  //확장자 꺼내오기
  var mimeType = mimeTypes.getType(extname);

  // 지정한 filename의 상태 정보를 반환 , 파일인지 디렉토리인지 구분한다.
  fs.stat(filename, function(err, status){  
    if(err){
      next();  // 다음 미들웨어 호출
    }else if(status.isFile()){
      res.writeHead(200, {'Content-Type': mimeType + ';charset=utf-8'});
      // 지정한 파일을 읽기 위한 readable stream 생성 빨대를 꼳았음.
      fs.createReadStream(filename).pipe(res);  //buffer만큼 차면 보내고, 다시 채우고 보내고로 효율적
    }else{
      res.writeHead(403, {'Content-Type' : 'text/html; charset=utf-8'});
      res.end('<h1>디렉토리 접근이 허용되지 않습니다.</h1>');
    }

  }); 
}

// 경로를 지정해주는 기능
var base;
function setBase(dir){
  base = dir;
  return staticServer;
}

module.exports = setBase;
