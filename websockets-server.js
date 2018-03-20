var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var port = 3001;

var ws = new WebSocketServer({
  port: port
});
var messages = [];
var topic = [];
topic.push("Pencils and pens");

console.log('websockets server started');

ws.on('connection', function(socket) {
  console.log('client connection established');
  var store = topic.pop();
  socket.send("*** Topic is \'" + store + "\'")
  topic.push(store);
  messages.forEach(function(msg) {
    socket.send(msg);
  });
  socket.on('message', function(data) {
    console.log('message received: ' + data);
    if (data.search("/topic") != -1) {

      ws.clients.forEach(function(clientSocket) {
        clientSocket.send("*** Topic has changed to \'" + data.substr(6) + "\'")
      });
      topic.push(data.substr(6));
    }
    messages.push(data);
    ws.clients.forEach(function(clientSocket) {
      clientSocket.send(data)
    });
  });
});
