/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require("express");
var sync = require("async");

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require("cfenv");

// create a new express server
var app = express();

// serve the files out of ./client as our main files
app.use(express.static(__dirname + "/client"));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

//SPYMASTER routes
app.get("/v1/gameData.json", function (req, res) {
    send_success_resp(res, getGameData());
});

app.get("/v1/gameData.json/:gameId", function (req, res) {
  console.log("SpyMaster looking for gameId=" + req.params["gameId"]);
  //console.log("Current Games running: " + JSON.stringify(currentGames));
  if (req.params["gameId"]) {
    var gameId = req.params["gameId"];
    if (currentGames[gameId]) {
      //console.log("Found gameId=" + gameId + " in currentGames cache");
      send_success_resp(res, currentGames[gameId]);
    }
    else {
      console.log("ERROR: gameId=" + gameId + " is not current in play!");
      send_error_resp(res, {"message": "GameId " + gameId + " is not found."});
    }
  }
});

app.delete("/v1/game/:gameId", function (req, res) {
  if (req.params["gameId"]) {
    var gameId = req.params["gameId"];
    deleteGameById(gameId);
  }
});

var currentGames = {};

function getGameData() {
    var retObj = getRandom25();
    var gameId = Math.floor(Math.random()*89999+10000);

    var data = {
      "gameId": gameId,
      "whoStarts": retObj.whoStarts,
      "cardList": retObj.data
    };

    console.log("Starting Game " + gameId + ", " + retObj.whoStarts.toUpperCase());
    currentGames[gameId] = data;
    //console.log("Current Games running: " + JSON.stringify(currentGames));
    setTimeout(deleteGameById, 60*60*1000, gameId);  //automatically delete game after 60 mins
    return data;
}


function getRandom25() {
   var wordbank = JSON.parse(JSON.stringify(require("./wordbank.json").data));
   var colorIdx = Math.floor(Math.random() * 2);
   var colorbank = JSON.parse(JSON.stringify(colorIdx == 0 ? 
                                             require("./colorbank.json").redStart : require("./colorbank.json").blueStart));
   
   colorbank = shuffle(colorbank);
   var array = [];

   for (var i=0; i<25;) {
     var randIdx = Math.floor(Math.random() * wordbank.length);
     if (wordbank[randIdx]) {
      wordbank[randIdx].team = colorbank[i];
       array.push(wordbank[randIdx]);
       //console.log( "getRandom25... + " + JSON.stringify(wordbank[randIdx]));
       delete wordbank[randIdx];
       i++;
     }
   }

   return { "whoStarts":colorIdx?"blue":"red", "data": array };
}

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

function deleteGameById(gameId) {
  if (currentGames[gameId]) {
      delete currentGames[gameId];
      console.log("Deleted " + gameId);
  }
}

function send_success_resp(res, obj) {
    if (arguments.length != 2) {
        console.error("send_success_resp: YOU'RE DOING IT WRONG");
        throw new Error();
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(obj));
    res.end();
}

function send_error_resp(res, obj) {
    if (arguments.length != 2) {
        console.error("send_success_resp: YOU'RE DOING IT WRONG");
        throw new Error();
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send(JSON.stringify(obj));
    res.end();
}


