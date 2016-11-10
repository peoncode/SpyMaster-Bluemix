
(function() {

function GameBoardCtrl($scope, gameDataService) {


  
  gameDataService.getData(function (err, gameData) {
    if (err) {
      $scope.page_load_error = "Unexpected error loading game data: " + err.message;
      return;
    }
    else {
      $scope.gameId = gameData["gameId"];
      $scope.whoStarts = gameData["whoStarts"];
      $scope.cardList = JSON.parse(JSON.stringify(gameData["cardList"]));
      $scope.gameRound = 1;
      $scope.blueScore = 0;
      $scope.redScore = 0;
      $scope.blueCardsOpen = 0;
      $scope.redCardsOpen = 0;
      $scope.blueWins = false;
      $scope.redWins = false;
      $scope.whosTurn = $scope.whoStarts;
    }
  });  
   
  $scope.revealCard = function(index) {
    var card = $scope.cardList[index];

    console.log("reveal pressed: " + card.name + " [" + card.team + "]");
    card.cardColor = card.team + "card";
    card.isRevealed = true;

    if (card.team == "blue") {
      $scope.blueCardsOpen++;  //Blue team scores!

      if (($scope.whoStarts == "blue" && $scope.blueCardsOpen == 9) ||
          ($scope.whoStarts == "red" && $scope.blueCardsOpen == 8)) {
        blueWins();
        gameOver();
        return;
      }

      if ($scope.whosTurn != card.team) {
        $scope.whosTurn = "blue";
        console.log("OOPS! Switch to Blue Team's turn");
      }
    }
    else if (card.team == "red") {
      $scope.redCardsOpen++;  //Red team scores!

      if (($scope.whoStarts == "red" && $scope.redCardsOpen == 9) ||
          ($scope.whoStarts == "blue" && $scope.redCardsOpen == 8)) {
        redWins();
        gameOver();
        return;
      }

      if ($scope.whosTurn != card.team) {
        $scope.whosTurn = "red";
        console.log("OOPS! Switch to Red Team's turn");
      }
    }
    else if (card.team == "yellow") { //switch teams
      if ($scope.whosTurn == "blue") {
        $scope.whosTurn = "red";
        console.log("NOPE! Switch to Red Team's turn");
      }
      else {
        $scope.whosTurn = "blue";
        console.log("NOPE! Switch to Blue Team's turn");
      }
    }
    else {  //black card!
      if ($scope.whosTurn == "red") {
        blueWins();
      }
      else {
        redWins();
      }

      gameOver();
      return;
    }    
  }

  function blueWins() {
    $scope.blueWins = true;
    $scope.blueScore++;
  }

  function redWins() {
    $scope.redWins = true;
    $scope.redScore++;
  }

  function gameOver() {
    for (var i in $scope.cardList) {
      $scope.cardList[i].isRevealed = true;
    }
  
    $scope.whosTurn = "";
    if ($scope.blueWins) {
      console.log("Game over. BLUE wins!");
    }
    else {
      console.log("Game over. RED wins!");
    }

    $scope.gameRound++;
  }

  $scope.newRound = function() {
    console.log("Preparing New round");
    gameDataService.getData(function (err, gameData) {
      if (err) {
        $scope.page_load_error = "Unexpected error loading game data: " + err.message;
        return;
      }
      else {
        // $scope.gameRound = gameData["gameRound"];
        // $scope.blueScore = gameData["blueScore"];
        // $scope.redScore = gameData["redScore"];
        $scope.gameId = gameData["gameId"];
        $scope.whoStarts = gameData["whoStarts"];
        $scope.cardList = JSON.parse(JSON.stringify(gameData["cardList"]));
        $scope.blueCardsOpen = 0;
        $scope.redCardsOpen = 0;
        $scope.blueWins = false;
        $scope.redWins = false;
        $scope.whosTurn = $scope.whoStarts;
      }
    });  




    // $scope.gameRound = gameDataService.getData()["gameRound"];
    //$scope.gameId = gameData["gameId"];
    //$scope.whoStarts = gameDataService.getData()["whoStarts"];
    // $scope.redScore = gameDataService.getData()["redScore"];
    // $scope.blueScore = gameDataService.getData()["blueScore"];
    //$scope.cardList = JSON.parse(JSON.stringify(gameDataService.getData()["cardList"]));
    // $scope.blueWins = false;
    // $scope.redWins = false;
    // $scope.redCardsOpen = 0;
    // $scope.blueCardsOpen = 0;
    // $scope.whosTurn = $scope.whoStarts;

    console.log("after: Starting ROUND " + $scope.gameRound);
  }
}

mainApp.controller('GameBoardCtrl', GameBoardCtrl);
})();


