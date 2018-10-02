const request = require('request');
const moment = require('moment');

const timeURL = "https://www.siriusxm.com/sxm_date_feed.tzi/";

var currentTimestamp;

updateTimestamp();
setInterval(updateTimestamp, 60000);

function getCurrentTimeStamp(){
  return currentTimestamp;
}

function updateTimestamp(){
  var options = {
    url: timeURL,
    headers: {
      'Cache-Control': 'no-cache'
    }
  };

  request.get(options, function(err, response, body){
    var timestamp = moment(body, "DDMMYYYYHHmmss");
    timestamp.add(4, 'h');

    saveTimestamp(timestamp);
  });
}

function saveTimestamp(timestamp){
  currentTimestamp = timestamp;
}

module.exports = {
  getCurrentTimeStamp
}
