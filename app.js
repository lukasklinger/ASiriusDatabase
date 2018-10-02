const express = require('express');
const app = express();
const server = require('http').createServer(app);
const time = require('./time.js');
const thePulse = require('./stations/thepulse.js');
const theBlend = require('./stations/theblend.js');
const hits1 = require('./stations/hits1.js');

server.listen(3000);
console.log('Server running on port 3000.');

setTimeout(updateAll, 5000);
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

app.get('/hits1', function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(hits1.getSongs()));
  res.end();
});

function updateAll(){
  var timestamp = time.getCurrentTimeStamp();
  console.log(timestamp.format());

  thePulse.update(timestamp);
  theBlend.update(timestamp);
  hits1.update(timestamp);
};

process.on('uncaughtException', function(){
  console.log("An uncaught exception happened.");
});
