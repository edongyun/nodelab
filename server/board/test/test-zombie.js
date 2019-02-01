var board = {writer: '좀비', title: '좀비가 등록함.', content: '좀비가 등록한 게시물'};

var Browser = require('zombie');
Browser.localhost('localhost', 80);

describe('게시판 테스트', function(){
  describe('메인 페이지 접속', function(){
    var browser = new Browser();
    before(function(done){
      browser.visit('/', done);  // localhost 접속
    });
    it('접속 성공 여부', function(){
      // 응답 성공 시 받는 2xx, 3xx 응답상태코드 확인
      browser.assert.success();
    });
    it('목록 화면', function(){
      browser.assert.text('header h1', '게시물 목록');
    });
  });
  describe('게시물 등록', function(){
    var browser = new Browser();
    before(function(done){
      browser.visit('/board/new', done);  // 등록화면 접속
    });
    it('등록 화면', function(){
      browser.assert.success();
      browser.assert.text('header h1', '글쓰기');
    });
    it('등록 요청', function(done){
      browser.fill('writer', board.writer);
      browser.fill('title', board.title);
      browser.fill('content', board.content);
      browser.pressButton('#regist', done);  // 등록 버튼을 눌러라.
    });
    it('등록 결과 화면', function(){
      browser.assert.success();
      browser.assert.text('header h1', '등록 결과');
    });
  });
});







