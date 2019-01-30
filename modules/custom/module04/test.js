var Score = require('./score');

var kim = new Score(100, 90);
var lee = new Score(90, 80);
console.log(kim.sum(), kim.avg());
console.log(lee.sum(), lee.avg());