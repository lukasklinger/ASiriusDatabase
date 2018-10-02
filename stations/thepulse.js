const request = require('request');
const moment = require('moment');

var songs = new Set();
var baseURL = "https://www.siriusxm.com/metadata/pdt/en-us/json/channels/thepulse/timestamp/";

function update(timestamp){
  getCurrentSong(addSongToArray, timestamp);
}

function getSongs(){
  var songObj = new Object();
  songObj.songs = Array.from(songs);

  return songObj;
}

function addSongToArray(newSong){
  console.log("thepulse: " + newSong);
  if(songs.size < 100){
    songs.add(newSong);
  } else {
    songs.add(newSong);
    removeOldSong();
  }
}

function removeOldSong(){
  var iterator = songs.values();
  songs.delete(iterator.next().value);
}

function getCurrentSong(callback, timestamp){
  var timestampFormatted = timestamp.format("MM-DD-HH:mm") + ":00";
  var currentSongURL = baseURL + timestampFormatted;

  request.get(currentSongURL, function(err, response, body){
    var reJSON = JSON.parse(body);

    var song = reJSON.channelMetadataResponse.metaData.currentEvent.song.name;
    var artist = reJSON.channelMetadataResponse.metaData.currentEvent.artists.name;

    var titleartist = song + " - " + artist;
    callback(titleartist);
  });
};

module.exports = {
  update,
  getSongs
}
