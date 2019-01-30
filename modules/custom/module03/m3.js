console.log('m3는 function()를 exports하는 모듈');

module.exports = function(score){
  return {
    sum: function(){
      return score.kor + score.eng;
    },
    avg: function(){
      return this.sum() / 2;
    }
  }
}

