const express = require('express');
const app = express();
const server = require('http').createServer(app);
const request = require('request');
const moment = require('moment');

const timeURL = "https://www.siriusxm.com/sxm_date_feed.tzi/";
const songURL = "https://www.siriusxm.com/metadata/pdt/en-us/json/channels/thepulse/timestamp/";

var songs = [];
var currentSongString = "";

server.listen(3000);
console.log('Server running on port 3000.');

addNewSong();
setInterval(addNewSong, 30000);

app.get('/json', function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
});

function addNewSong(){
  getCurrentSong(addSongToArray);
}

function addSongToArray(newSong){
  console.log(newSong);

  if(currentSongString !== newSong){
    if(songs.length < 100){
      songs.push(newSong);
    } else {
      songs.shift();
      songs.push(newSong);
    }
  }
}

function getCurrentSong(callback){
  var timeInput = moment();
  timeInput.subtract(2, 'h'); //will this work summer / winter time??
  var timestamp = timeInput.format("MM-DD-HH:mm") + ":00";
  var currentSongURL = songURL + timestamp;

  request.get(currentSongURL, function(err, response, body){
    var reJSON = JSON.parse(body);
    var song = reJSON.channelMetadataResponse.metaData.currentEvent.song.name;
    var artist = reJSON.channelMetadataResponse.metaData.currentEvent.artists.name;

    var titleartist = song + " - " + artist;
    console.log(titleartist);
    callback(titleartist);
  });
}
