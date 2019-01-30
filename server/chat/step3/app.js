var path = require('path');
var static = require('./middleware/static')(path.join(__dirname, 'public'));

var logger = require('./middleware/logger')({type: 'file', path: 'log_chat.txt'});
var app = function(req, res){
  static(req, res);
  logger(req, res);
}

module.exports = app;




