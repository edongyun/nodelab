var model = require('../models/board');  //mongodb
// var model = require('../models/board_mysql');  //mysql
// var model = require('../models/board_async');  // 비동기 함수

exports.list = function(req, res){
  model.list(function(list){
    res.render('board/list', { title: '게시물 목록', list: list });
  })
};
exports.form = function(req, res){
  res.render('board/write', { title: '글쓰기' });
};
exports.create = function(req, res){
  var board = req.body;  // post 방식은 req.body에서 꺼낸다.
  model.create(board, function(no){
    res.render('board/result', { title: '등록 결과', no: no });
  });
};
exports.show = function(req, res){
  var no = req.params.no;  // 게시물 상세보기 페이지 뒤에 붙는 숫자
  model.show(parseInt(no), function(board){
    res.render('board/view', { title: '내용 조회', board: board });
  });
};
exports.remove = function(req, res){
  var no = req.params.no;
  model.remove(parseInt(no), function(){
    res.redirect('/board');  
  });
};




