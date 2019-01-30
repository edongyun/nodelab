var fs = require('fs');
const EOL = require('os').EOL;

// log를 남기고 싶은 환경을 매개변수(option)에 따라 다르게 처리하는 함수
function logger(option){
  if(option.type == 'file'){
    var logfile = require('fs').createWriteStream(option.path, {flags: 'a'});
  }
  return function(req, res){
    if(option.type == 'console'){
      console.log(`[${Date()}] ${res.statusCode} ${req.url}`);
    }else if(option.type == 'file'){
      logfile.write(`[${Date()}] ${res.statusCode} ${req.url}`);
      logfile.write(EOL)  // 줄바꿈 기호
    }
  }
}

module.exports = logger;