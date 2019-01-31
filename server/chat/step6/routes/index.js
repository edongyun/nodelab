var url = require('url');
var path = require('path');
var fs = require('fs');
var ejs = require('ejs');


function chat(req, res){
  // 채팅 화면으로 이동
  // res.writeHead(303, {Location: '/chat.html'});
  // res.end();
  // nickname = url.parse(req.url, true).query.username

  // TODO: session에 대화명 추출
  var nickname = req.session.nickname;
  // nickname이 존재하면 정상적인 접근
  // if(!nickname){
  //   // res.writeHead(303, {Location: '/'});  // 메인 페이지로
  //   // res.end();
  //   // return;
  // }

  res.render('chat', {title: '채팅방', nickname: nickname});
}

function login(req, res){
  var nickname = url.parse(req.url, true).query.username;
  if(nickname && nickname.trim() != ''){
    // TODO: session에 대화명 저장
    req.session.nickname = nickname;
    res.writeHead(303, {Location: '/chat'});
  }else{
    res.writeHead(303, {Location: '/'});
  }
  res.end();
}

function logout(req, res){
  // TODO: session 제거
  req.session.destroy();
  res.writeHead(303, {Location: '/'});
  res.end();
}

var router = function(req, res, next){
  var pathname = url.parse(req.url).pathname;
  switch(pathname){
    case '/chat':
      chat(req, res);
      break;
    case '/login':
      login(req, res);
      break;
    case '/logout':
      logout(req, res);
      break;
    default:
      next();
  }
}

module.exports = router;