var url = require('url');
var path = require('path');
var fs = require('fs');

var views = path.join(__dirname, '..', 'views');

function chat(req, res){
  // 채팅 화면으로 이동
  // res.writeHead(303, {Location: '/chat.html'});
  // res.end();
  // nickname = url.parse(req.url, true).query.username

  // TODO: session에 대화명 추출
  var nickname = '';
  var filename = 'chat.html';
  fs.readFile(path.join(views, filename), function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    data = data.toString().replace('<%=nickname%>', nickname);
    res.end(data);
  });
}

function login(req, res){
  var nickname = url.parse(req.url, true).query.username;
  if(nickname && nickname.trim() != ''){
    // TODO: session에 대화명 저장
    res.writeHead(303, {Location: '/chat'});
  }else{
    res.writeHead(303, {Location: '/'});
  }
  res.end();
}

function logout(req, res){
  // TODO: session 제거
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