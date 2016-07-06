'use strict';

const express        = require('express');
const app            = express();
const path           = require('path');

app.use('/client', express.static(path.join(__dirname, '/client')));
app.use('/roi', express.static(path.join(__dirname, '/roi')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const server = require('http').Server(app);

server.listen(3000, function(){
  console.log('listening on *:3000');
});
