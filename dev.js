'use strict';

const express        = require('express');
const app            = express();
const path           = require('path');
const fs             = require('fs');

app.use('/client', express.static(path.join(__dirname, '/client')));
app.use('/roi', express.static(path.join(__dirname, '/roi')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

['FB', 'GOOG'].forEach((name) => {
  app.get(`/resources/${name}.json`, function(req, res) {
    fs.readFile(`resources/${name.toLowerCase()}.json`, 'utf8', (err, content) => {
      if(err) {
        res.status(404);
      } else {
        res.json(JSON.parse(content));
      }
    })
  });
});

const server = require('http').Server(app);

server.listen(3000, function(){
  console.log('listening on *:3000');
});
