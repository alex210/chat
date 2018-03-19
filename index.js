var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require("body-parser");

// app.get('/', function(req, res){
//    res.sendFile(__dirname + '/index.html');
// });

// app.get('/style', function(req, res){
//    res.sendFile(__dirname + '/style.css');
// });

var urlencodedParser = bodyParser.urlencoded({extended: false});
app.post('/event', urlencodedParser, function(req, res){
   io.emit('event'+req.body.staff, req.body.message);
   res.send();
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});