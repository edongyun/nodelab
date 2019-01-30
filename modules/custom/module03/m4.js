console.log('m4는 전형적임 모듈. (주로 코어모듈들이 이렇게 만들어져 있다.)')

var somObj = {
  //함수롤 인자로 받는 경우
  createServer: function(fn){},
  //파일명과 함수를 인자로 받는 경우
  readFile: function(filename, fn){},
  //리렉토리와 파일이름을 인자로 받는 경우
  join: function(dir, filename){}
};

module.exports = somObj;




