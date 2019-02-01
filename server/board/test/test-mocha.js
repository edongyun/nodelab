var assert = require('assert');
var board = {writer: '김철수', title: 'mocha 테스트', content: '김철수 만세'};
var result = {writer: '김철수', title: 'mocha 테스트', content: '김철수 만세'};

// test suite
// describe('#suite-1 동기 방식 테스트', function(){
describe.skip('#suite-1 동기 방식 테스트', function(){
  // unit test
  it('#1 assert()', function(){
    assert(result == board);
  });
  it('#2 assert.equal()', function(){
    assert.equal(result, board);
  });
  it('#3 assert.deepEqual()', function(){
    assert.deepEqual(result, board);
  });
});  //.skip을 빼면 테스트 진행

// 비동기 함수를 순차적으로 테스트 처리되도록 하는 코드
// setTimeout()함수가 비동기로 호출되기 때문에 안의 에러가 체크되지않고 에러가 없는 것처럼 나온다.
describe('#suite-2 비동기 방식 테스트', function(){
  // unit test
  it('#1 assert()', function(done){
    setTimeout(function(){
      assert(result == board);
      done();
    }, 1000);
  });
  it('#2 assert.deepEqual()', function(done){
    this.timeout(1000*10);
    setTimeout(function(){
      assert.deepEqual(result, board);
      done();
    }, 10);
  });
  it('#3 assert.equal()', function(done){
    setTimeout(function(){
      assert.equal(result, board);
      done();
    }, 1000);
  });
});


// 게시판 기능 테스트
var model = require('../models/board');
describe.only('게시판 기능 테스트', function(){
  // 전역 변수
  var newNo;
  var beforeList;

  // 테스트 전 사전작업
  before(function(done){
    setTimeout(done, 1500);  // db 연결 시간 확보
  });
  before(function(done){
    model.list(function(list){
      beforeList = list;
      done();
    })
  });
  // 사후작업
  after(function(){
    model.close();
  });

  describe('1. 등록 기능', function(){
    it('1-1 등록 요청', function(done){
      model.create(board, function(no){
        assert.equal(typeof no, 'number'); // 넘어온 게시물 번호가 숫자인가?
        newNo = no;
        done();
      });
    });
    it('1-2 등록한 게시물 조회', function(done){
      model.show(newNo, function(newBoard){
        assert.deepEqual(newBoard, board);
        done();
      });
    });
  });
  describe('2. 삭제 기능', function(){
    it('2-1 삭제 요청', function(done){
      model.remove(newNo, done)
    });
    it('2-2 목록 조회', function(done){
      model.list(function(list){
        assert.deepEqual(list, beforeList);
        done();
      });
    });
  });
});













