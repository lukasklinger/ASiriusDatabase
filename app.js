const express = require('express');
const app = express();
const server = require('http').createServer(app);
const thePulse = require('./stations/thepulse.js');
const theBlend = require('./stations/theblend.js');

server.listen(3000);
console.log('Server running on port 3000.');

updateAll();
setInterval(updateAll, 60000);

app.get('/thepulse', function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(thePulse.getSongs()));
  res.end();
});

app.get('/theblend', function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(theBlend.getSongs()));
  res.end();
});

function updateAll(){
  thePulse.update();
  theBlend.update();
};

process.on('uncaughtException', function(){
  console.log("An uncaught exception happened.");
});
