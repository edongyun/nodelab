var http = require('http'); 
var fs = require('fs');     
var customModule = require('./hellonode.js');  // custom module 로드
var path = require('path');

// create http server
var server = http.createServer(function (req, res) {	
  var fileName = req.url.substring(1);  //"hello.html" 스트링 저장
  console.log(fileName);

  // 스트림 방식
  var stream = fs.createReadStream(path.join(__dirname, fileName));

  // 해당 파일을 읽을 준비가 되면 발생하는 open 이벤트
  stream.on('open', function(){
    res.writeHead(200);  // 200 정상 헤드 전송
  });
  // error 이벤트가 발생할 경우 404에러 해드 전송
  stream.on('error', function(){
    res.writeHead(404);
    res.end('<h1>' + fileName + ' Not found!!!</h1>');
  });
  stream.on('data', function(data){
    res.write(data);  //res는 writeable stream 객체, 클라이언트에게 응답
    process.stdout.write(data);  // 터미널에 hello.html 텍스트 출력
  });
  // 파일 읽기가 모두 끝나고 닫히면 발생하는 close 이벤트
  stream.on('close', function(){
    res.end();
  });
// }).listen(1234);
});

// server 구동 중 에러가 발생할 경우 발생하는 이벤트
server.on('error', function(){
  console.error(err);
});

// server가 정상구동된 경우 발생하는 이벤트
server.on('listening', function(){
  console.log('HTTP 서버 구동 완료. http://localhost:1234');
});

// listening 이벤트 등록, port 번호 지정
server.listen(1234);

/* 위 두 메소드를 합쳐서 작성할 수도 있다.
server.listen(1234, function(){
  console.log('HTTP 서버 구동 완료. http://localhost:1234');
});
*/

console.log('Server running on 1234/');

/*
  //동기 방식의 함수 사용
  try{
    var data = fs.readFileSync("hello.html");
    res.writeHead(200);
    res.end(data);  // write message and signal communication is complete
  }catch{
    res.writeHead(404);
    res.end('<h1>' + "hello.html" + ' Not found!!!</h1>');
  } 
*/

/*
//비동기 방식의 함수 사용
  fs.readFile(fileName, function(err, data){
    if(err){
      res.writeHead(404);
      res.end('<h1>' + fileName + ' Not found!!!</h1>');
    }else{
      res.writeHead(200);
      res.end(data); 
    }
  });
*/

/*
res.writeHead(200);
  res.end('<h1>' + customModule.sayHello('Custom') + '</h1>');
*/

/*
// 스트림 방식
  var stream = fs.createReadStream(path.join(__dirname, fileName));

  // 해당 파일을 읽을 준비가 되면 발생하는 open 이벤트
  stream.on('open', function(){
    res.writeHead(200);  // 200 정상 헤드 전송
  });
  // error 이벤트가 발생할 경우 404에러 해드 전송
  stream.on('error', function(){
    res.writeHead(404);
    res.end('<h1>' + fileName + ' Not found!!!</h1>');
  });
  stream.on('data', function(data){
    res.write(data);  //res는 writeable stream 객체
  });
  // 파일 읽기가 모두 끝나고 닫히면 발생하는 close 이벤트
  stream.on('close', function(){
    res.end();
  });
*/

