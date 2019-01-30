console.log('m5는 범용적인 필요한 확장모듈에서 주로 사용하는 방식.')

// log를 남기고 싶은 환경을 option에 따라 다르게 처리하는 함수
function logger(option){
  if(option.type == 'file'){
    var logfile = require('fs').createWriteStream(option.path, {flags: 'a'});
  }
  
  return {
    log: function(msg){
      if(option.type == 'console'){
        console.log(msg);
      }else if(option.type == 'file'){
        logfile.write(msg + require('os').EOL);
      }
    }
  };
}

module.exports = logger;  // 함수를 exports










