var Game = Backbone.Model.extend({

  initialize: function(){
    this.set({playerScore: 0, computerScore: 0, tieScore: 0, gameScore1: 0, gameScore2: 0, newGame: false, moveCount: 0, prevWinner: null});
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
    this.scoreSet(this.get('gameScore1'), this.get('gameScore2'));
  },

  scoreSet: function(score1, score2) {
    if (score1 > score2) {
      this.set({prevWinner: "Player 1 Wins!"});
      this.set({playerScore: this.get('playerScore')+1});
    } else if (score1 < score2) {
      this.set({prevWinner: "Player 2 Wins!"});
      this.set({computerScore: this.get('computerScore')+1});
    } else {
      this.set({prevWinner: "Tie Game"});
      this.set({tieScore: this.get('tieScore')+1});
    }
  },

  newBoard: function(){
    this.set({newGame: true, moveCount: 0, gameScore1: 0, gameScore2: 0});
  },

  boardChangeListener: function(){
    this.get('board').on('change:p1SqScore change:p2SqScore', function(){
      this.winCheck(this.get('board').get('p1SqScore'), 1);
      this.winCheck(this.get('board').get('p2SqScore'), 10);
      this.set({moveCount: this.get('moveCount')+1});
      if (this.get('moveCount') > 5) { //35
        this.finalScoreCheck();
      }
    }, this);
  },

  winCheck: function(array, player) {
    if (player === 1) {
      this.set({gameScore1: 0});
    } else {
      this.set({gameScore2: 0});
    }
    var z = 0;
    var twoDArray = [];
    for (var i = 0; i < 36; i += 6) {
      twoDArray.push(array.slice(i, i+6));
    }

    function areEqual(){
      for (var j = 1; j < arguments.length; j++) {
        if (arguments[j] === undefined || arguments[j] !== arguments[j-1]) {
          return false;
        }
      }
      return true;
    }

    //check rows
    for (var i = 0; i < 6 ; i++) {
      var rowScore = 0;
      z = 0;
      while (z < 4) {
        if (z < 1) {
          if (areEqual(player, twoDArray[i][0], twoDArray[i][1], twoDArray[i][2], twoDArray[i][3], twoDArray[i][4], twoDArray[i][5])){
            rowScore = 20;
            z = 4;
          }
        }
        if (z < 2) {
          if (areEqual(player, twoDArray[i][z], twoDArray[i][1+z], twoDArray[i][2+z], twoDArray[i][3+z], twoDArray[i][4+z])){
            rowScore = 10;
            z = 4;
          }
        }
        if (z < 3) {
          if (areEqual(player, twoDArray[i][z], twoDArray[i][1+z], twoDArray[i][2+z], twoDArray[i][3+z])){
            rowScore = 3;
            z = 4;
          }
        }
        if (z < 4) {
          if (areEqual(player,twoDArray[i][z],twoDArray[i][1+z],twoDArray[i][2+z])){
            rowScore = 1;
            z = 4;
          }
        }
        z++;
      }
      if (rowScore) {
        this.gameScoreSet(rowScore, player);
      }
    }
    //check columns
    for (var i = 0; i < 6 ; i ++) {
      var colScore = 0;
      z = 0;
      while (z < 24) {
        if (z < 1) {
          if (areEqual(player, twoDArray[0][i], twoDArray[1][i], twoDArray[2][i], twoDArray[3][i], twoDArray[4][i], twoDArray[5][i])){
            colScore = 20;
            z = 4;
          }
        }
        if (z < 2) {
          if (areEqual(player, twoDArray[0+z][i], twoDArray[1+z][i], twoDArray[2+z][i], twoDArray[3+z][i], twoDArray[4+z][i])){
            colScore = 10;
            z = 4;
          }
        }
        if (z < 3) {
          if (areEqual(player, twoDArray[0+z][i], twoDArray[1+z][i], twoDArray[2+z][i], twoDArray[3+z][i])){
            colScore = 3;
            z = 4;
          }
        }
        if (z < 4) {
          if (areEqual(player, twoDArray[0+z][i], twoDArray[1+z][i], twoDArray[2+z][i])){
            colScore = 1;
            z = 4;
          }
        }
        z++;
      }
      if (colScore) {
        this.gameScoreSet(colScore, player);

      }
    }
    // check diagonals
    //check down to right
    for (var i = -3; i < 4; i++) {
      var diagScore1 = 0;
      z = 0;
      while (z < 4) {
        if (i === 0 && z < 1) {
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
        this.gameScoreSet(diagScore2, player);
      }
    }

  }
});
