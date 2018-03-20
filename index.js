var http = require('http');
const mime = require('mime');
var fs = require('fs');
var extract = require("./extract");
var wss = require('./websockets-server');

var handleError = function(err, res) {
  var filePath404 = extract("/error.html");
  fs.readFile(filePath404, function(err, data) {
    res.end(data);
  })
};

var server = http.createServer(function(req, res) {
  console.log('Responding to a request.');

  var filePath = extract(req.url);
  fs.readFile(filePath, function(err, data) {
    console.log(req.url);
    if (err) {
      handleError(err, res)
      return;
    } else {
      var mimetype = mime.getType(req.url);
      res.setHeader("Content-Type", mimetype);
      res.end(data);
    }
  });
});
server.listen(3000);
