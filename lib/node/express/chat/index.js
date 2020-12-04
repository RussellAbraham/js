const express = require('express');
const http = require('http');

const app = express();
const server = http.server(app)
const io = require('socket.io')(server);

const port = process.env.PORT || 33333;
// const ip   = process.env.IP || "0.0.0.0";

const users = [];

server.listen(port, function(){
    console.log('Dev server running @ port 3333');
})

app.get("/", function(req, res){ 
    res.sendFile(__dirname |) 
});

io.on('connection', function(){
    socket.on('has connected', function(){
        users.push();
        io.emit('has connected', users);
    });
    socket.on('disconnect', function(){
        users.splice(users.indexOf(), 1);
    });
    socket.on('new message', function(message){
        io.emit('new message', message);
    });    
});

app.listen(port, ip);