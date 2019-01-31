/**
* 웹 서버 개발시 해야 할 일들
* 1. 로깅 남기는 작업(누가 언제 접속해서 무엇을 했는지...)
* 2. url 텍스트 인코딩 처리(query string 추출)
* 3. POST 방식의 body 파싱하여 데이터 추출하는 작업 
* 4. JSON 방식의 body 파싱
* 5. 쿠키 파싱
* 6. 정적인 자원 응답(현재 static 모듈이 처리하는 것)
* 7. 세션 구현(로기인 상태 유지)
* 8. 동적인 자원 응답(DB 등 매번 달라지는 자원)
* 9. 파일 업로드
* 10. DB 핸들링
* 11. 보안(인증, 권한)
* 12. 에러 처리
* .......
*
* 각각의 기능을 독립적인 함수로 작성(미들웨어)
* 현재 1번과 6번을 logger와 static 미들웨어로 만들었음.
* connect 확장모듈 사용
* - 미들웨어를 관리하는 컨테이너
* - 미들웨어는 자체적으로 제공하지 않음
**/

var fs = require('fs');
var path = require('path');
var static = require('serve-static');  //정적자원 처리
var logger = require('morgan');   //logging
var session = require('express-session');  //session 처리
var nocache = require('nocache');   // cache할 자원과 아닌 것 처리

var indexRouter = require('./routes/index');
var connect = require('connect');
var ejs = require('ejs');
var app = connect();

// 미들웨어 등록
app.use(function(req, res, next){
  // ejs view engine 설정
  res.locals = {};
  res.render = function(filename, data){
    if(!data) data = res.locals;
    var filepath = path.join(__dirname, 'views', filename + '.ejs');
    ejs.renderFile(filepath, data, function(err, result){
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
      res.end(result);
    });
  };
  next();
});
app.use(logger('dev'));  //:method :url :status :response-time ms - :res[content-length]
app.use(static(path.join(__dirname, 'public')));  //정적인 자원이 있는 경로를 인자로 전달
app.use(function(req, res, next){  // session 값 확인 미들웨어
  console.log('=== before ===');
  console.log(req.session);
  next();
});
app.use(session({
  cookie: {maxAge: 1000*60*3}, //cookie 유지시간 30분
  secret: 'sometext',
  rolling: true,               // 매 요청마다 쿠키 시간 초기화(사용이 있으면 쿠기시간 초기화)
  resave: false,               //세션이 수정되지 않으면 서버에 다시 저장하지 않음.
  saveUninitialized: false     // 세션에 아무런 값이 없ㅇ면 클라이언트에 쿠키를 전송하지 않음.
}));  
app.use(function(req, res, next){  // session 값 확인 미들웨어
  console.log('=== after ===');
  console.log(req.session);
  next();
});
app.use(nocache());  // 캐시 사용하지 마라
app.use(indexRouter);   // router에서 등록된 동적인 url 처리
// 404에러 처리 미들웨어
app.use(function(req, res, next){
  var err = new Error(req.url + ' 파일을 찾을 수 없습니다.');
  err.status = 404;

  res.locals.message = err.message;
  res.locals.error = err;
  res.render('error');
});  

module.exports = app;




