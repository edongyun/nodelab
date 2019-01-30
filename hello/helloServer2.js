var http = require('http');
var nodeStatic = require('node-static');  // static한 파일에 대한 쉬운 접근 제공

// Create a node-static server instance to serve the './public' folder
// var file = new static.Server('./public');

var file = new nodeStatic.Server(__dirname);
console.log(__dirname);

http.createServer(function(req, res){
  file.serve(req, res);
}).listen(2345);


