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

var path = require('path');
var static = require('./middleware/static');
var logger = require('./middleware/logger');
var connect = require('connect');

var app = connect();

// 미들웨어 등록
app.use(logger({type: 'file', path: 'log_chat.txt'}));
app.use(static(path.join(__dirname, 'public')));
// 404에러 처리 미들웨어
app.use(function(req, res, next){
  res.writeHead(404, {'Content-Type' : 'text/html; charset=utf-8'});
  res.end('<h1>' + req.url +' 지정한 파일을 찾을 수 없습니다.</h1>');
});  

module.exports = app;




