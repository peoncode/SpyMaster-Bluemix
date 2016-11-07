/*
   GameDataService
*/
(function(){

  function gameDataService() {

    var data = {
      "gameId": 1234,
      "gameRound": 1,
      "blueScore": 0,
      "redScore": 0,
      "whoStarts": "blue",
      "cardList": [{
                      'name': 'APPLE',
                      'isRevealed': false,
                      'team': 'blue'
                    }, {
                      'name': 'NEW YORK',
                      'isRevealed': false,
                      'team': 'blue'
                    }, {
                      'name': 'BASEBALL',
                      'isRevealed': false,
                      'team': 'red'
                    }, {
                      'name': 'MICROPHONE',
                      'isRevealed': false,
                      'team': 'red'
                    }, {
                      'name': 'TREE',
                      'isRevealed': false,
                      'team': 'blue'
                    }, {
                      'name': 'TIRE',
                      'isRevealed': false,
                      'team': 'red'
                    }, {
                      'name': 'CALENDAR',
                      'isRevealed': false,
                      'team': 'yellow'
                    }, {
                      'name': 'UMBRELLA',
                      'isRevealed': false,
                      'team': 'black'
                    }, {
                      'name': 'PENCIL',
                      'isRevealed': false,
                      'team': 'yellow'
                    }, {
                      'name': 'GLASSES',
                      'isRevealed': false,
                      'team': 'blue'
                    }, {
                      'name': 'TOOTHPASTE',
                      'isRevealed': false,
                      'team': 'yellow'
                    }, {
                      'name': 'ALASKA',
                      'isRevealed': false,
                      'team': 'blue'
                    }, {
                      'name': 'LION',
                      'isRevealed': false,
                      'team': 'red'
                    }, {
                      'name': 'CHOCOLATE',
                      'isRevealed': false,
                      'team': 'yellow'
                    }, {
                      'name': 'GRAPE',
                      'isRevealed': false,
                      'team': 'blue'
                    }, {
                      'name': 'STAMP',
                      'isRevealed': false,
                      'team': 'yellow'
                    }, {
                      'name': 'BATTERY',
                      'isRevealed': false,
                      'team': 'red'
                    }, {
                      'name': 'GEODE',
                      'isRevealed': false,
                      'team': 'red'
                    }, {
                      'name': 'CASHEW',
                      'isRevealed': false,
                      'team': 'blue'
                    }, {
                      'name': 'COFFEE',
                      'isRevealed': false,
                      'team': 'red'
                    }, {
                      'name': 'SUIT',
                      'isRevealed': false,
                      'team': 'yellow'
                    }, {
                      'name': 'HAIR',
                      'isRevealed': false,
                      'team': 'red'
                    }, {
                      'name': 'SCISSOR',
                      'isRevealed': false,
                      'team': 'blue'
                    }, {
                      'name': 'BUTTON',
                      'isRevealed': false,
                      'team': 'yellow'
                    }, {
                      'name': 'DIARRHEA',
                      'isRevealed': false,
                      'team': 'blue'
                    }]
    };

    this.set = function(key, value) {
      data[key] = value;
    }

    this.getData = function() {
      return data;
    }
  }

  mainApp.service('gameDataService', gameDataService);

})();
