(function(){

  function LoginCtrl($scope, $location) {
    $scope.newGame = function() {
      console.log("New Game!");
      $location.path("/game");
    };


    $scope.playAsSpy = function() {
      //console.log("SPY Game! " + $scope.spyGameId);
      $location.path("/gameSpy/" + $scope.spyGameId);
    };


    $scope.gotoFAQ = function() {
      console.log("README!");
    };

  }

  mainApp.controller("LoginCtrl", LoginCtrl);
})();


