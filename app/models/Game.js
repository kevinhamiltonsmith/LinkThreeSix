var Game = Backbone.Model.extend({

  initialize: function(){
    this.set({playerScore: 0, computerScore: 0, tieScore: 0, gameScore1: 0, gameScore2: 0, newGame: false, moveCount: 0});
    this.set('board', new Board());

    this.boardChangeListener();
  },

  gameScoreSet: function(score, id) {
    if (id == 1) {
      this.set({gameScore1: this.get('gameScore1')+score});
    }
    if (id == 10) {
      this.set({gameScore2: this.get('gameScore2')+score});
    }
  },

  finalScoreCheck: function() {
    this.winCheck(this.get('board').get('p1SqScore'), 1);
    this.winCheck(this.get('board').get('p2SqScore'), 10);
    var finalScore1 = this.get('gameScore1');
    var finalScore2 = this.get('gameScore2');
    this.scoreSet(finalScore1, finalScore2);
  },

  scoreSet: function(score1, score2) {
    if (score1 > score2) {
      this.set({playerScore: this.get('playerScore')+1});
    } else if (score1 < score2) {
      this.set({computerScore: this.get('computerScore')+1});
    } else {
      this.set({tieScore: this.get('tieScore')+1});
    }
  },

  newBoard: function(){
    this.set({newGame: true, moveCount: 0});
  },

  boardChangeListener: function(){
    this.get('board').on('change:p1SqScore change:p2SqScore', function(){
      this.set({moveCount: this.get('moveCount')+1});
  //TODO
      if (this.get('moveCount') > 35) {
        this.finalScoreCheck();
      }
    }, this);
  },

  winCheck: function(array, player) {
    //TODO: refactor check rows and colums to be in the same loop
    //TODO: refactor diagonal checkers
    function areEqual(){
      for (var j = 1; j < arguments.length; j++) {
        if (arguments[j] == undefined || arguments[j] !== arguments[j-1]) {
          return false;
        }
      }
      return true;
    };
    //check rows
    for (var i = 0; i < 36 ; i += 6) {
      var rowScore = 0;
      var z = 0;
      while (z < 4) {
        if (z < 1) {
          if (areEqual(player, array[i], array[i+1], array[i+2], array[i+3], array[i+4], array[i+5])){
            rowScore = 20;
            z = 4;
          }
        }
        if (z < 2) {
          if (areEqual(player, array[i+z], array[i+1+z], array[i+2+z], array[i+3+z], array[i+4+z])){
            rowScore = 10;
            z = 4;
          }
        }
        if (z < 3) {
          if (areEqual(player, array[i+z], array[i+1+z], array[i+2+z], array[i+3+z])){
            rowScore = 3;
            z = 4;
          }
        }
        if (areEqual(player,array[i+z],array[i+1+z],array[i+2+z])){
          rowScore = 1;
          z = 4;
        }
        z++;
      }
      if (rowScore) {
        this.gameScoreSet(rowScore, player);
        console.log('rowScore', rowScore, 'player', player);
      }
    }
    //check columns
    for (var i = 0; i < 6 ; i ++) {
      var colScore = 0;
      z = 0;
      while (z < 24) {
        if (z < 6) {
          if (areEqual(player, array[i], array[i+6], array[i+12], array[i+18], array[i+24], array[i+30])){
            colScore = 20;
            z = 24;
          }
        }
        if (z < 12) {
          if (areEqual(player, array[i+z], array[i+6+z], array[i+12+z], array[i+18+z], array[i+24+z])){
            colScore = 10;
            z = 24;
          }
        }
        if (z < 18) {
          if (areEqual(player, array[i+z], array[i+6+z], array[i+12+z], array[i+18+z])){
            colScore = 3;
            z = 24;
          }
        }
        if (areEqual(player,array[i+z],array[i+6+z],array[i+12+z])){
          colScore = 1;
          z = 24;
        }
        z += 6;
      }
      if (colScore) {
        console.log('colScore', colScore, 'player', player);
        this.gameScoreSet(colScore, player);

      }
    }    
    // check diagonals
    var twoDArray = [];
    for (var i = 0; i < 36; i += 6) {
      twoDArray.push(array.slice(i, i+6));
    }
    //check down to right
    for (var i = -3; i < 4; i++) {
      var diagScore1 = 0;
      z = 0;
      while (z < 4) {
        if (i == 0 && z < 1) {
          if (areEqual(player, twoDArray[z][i], twoDArray[z+1][i+1], twoDArray[z+2][z+2], twoDArray[z+3][i+3], twoDArray[z+4][i+4], twoDArray[z+5][i+5])) {
            diagScore1 = 20;
            z = 4;
          }
        }
        if (i < 2 && z < 2) {
          if (areEqual(player, twoDArray[z][i+z], twoDArray[z+1][i+z+1], twoDArray[z+2][i+z+2], twoDArray[z+3][i+z+3], twoDArray[z+4][i+z+4])) {
            diagScore1 = 10;
            z = 4;
          }
        }
        if (i < 3 && z < 3) {
          if (areEqual(player, twoDArray[z][i+z], twoDArray[z+1][i+z+1], twoDArray[z+2][i+z+2], twoDArray[z+3][i+z+3])) {
            diagScore1 = 3;
            z = 4;
          }
        }        
        if (z < 4) {
          if (areEqual(player, twoDArray[z][i+z], twoDArray[z+1][i+z+1], twoDArray[z+2][i+z+2])) {
            diagScore1 = 1;
            z = 4;
          }
        }
        z++;
      }
      if (diagScore1) {
        console.log('diagScore1', diagScore1, 'player', player)
        this.gameScoreSet(diagScore1, player);
      }
    }
    //check down to left
    for (var i = 2; i < 9; i++) {
      var diagScore2 = 0;
      z = 0;
      while (z < 4) {
        if (i == 5 && z < 1) {
          if (areEqual(player, twoDArray[z][i], twoDArray[z+1][i-1], twoDArray[z+2][z-2], twoDArray[z+3][i-3], twoDArray[z+4][i-4], twoDArray[z+5][i-5])) {
            diagScore2 = 20;
            z = 4;
          }
        }
        if (i < 7 && z < 2) {
          if (areEqual(player, twoDArray[z][i-z], twoDArray[z+1][i-z-1], twoDArray[z+2][i-z-2], twoDArray[z+3][i-z-3], twoDArray[z+4][i-z-4])) {
            diagScore2 = 10;
            z = 4;
          }
        }
        if (i < 8 && z < 3) {
          if (areEqual(player, twoDArray[z][i-z], twoDArray[z+1][i-z-1], twoDArray[z+2][i-z-2], twoDArray[z+3][i-z-3])) {
            diagScore2 = 3;
            z = 4;
          }
        }
        if (z < 4) {
          if (areEqual(player, twoDArray[z][i-z], twoDArray[z+1][i-z-1], twoDArray[z+2][i-z-2])) {
            diagScore2 = 1;
            z = 4;
          }
        }
        z++;
      }
      if (diagScore2) { 
        console.log('diagScore2', diagScore2,'player', player)
        this.gameScoreSet(diagScore2, player);
      }
    }

  }
});
