var Game = Backbone.Model.extend({

  initialize: function(){
    this.set({playerScore: 0, computerScore: 0, tieScore: 0, gameScore1: 0, gameScore2: 0, newGame: false, moveCount: 0});
    this.set('board', new Board());

    this.boardChangeListener();
//TODO: test data
    this.finalScoreCheck();
  },

  winCheck: function(array, player) {
    //TODO: refactor check rows and colums to be in the same loop
    //TODO: refactor diagonal checkers
    function areEqual(){
      for (var j = 1; j < arguments.length; j++) {
        if (arguments[j] !== arguments[j-1]) {
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
      if (rowScore) { this.gameScoreSet(rowScore, player); }
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
      if (colScore) { this.gameScoreSet(colScore, player); }
    }    
    // check diagonals
    //check down to right
    for (var i = -3; i < 4; i++) {
      var diagScore1 = 0;
      z = 0;
      while (z < 28) {
        if (z < 7) {
         if (areEqual(player, array[i], array[i+7], array[i+14], array[i+21], array[i+28], array[i+35])) {
            diagScore1 = 20;
            z = 28;
          }
        }
        if (z < 14) {
          if (areEqual(player, array[i+z], array[i+7+z], array[i+14+z], array[i+21+z], array[i+28+z])) {
            diagScore1 = 10;
            z = 28;
          }         
        }
        if (z < 21) {
          if (areEqual(player, array[i+z], array[i+7+z], array[i+14+z], array[i+21+z])) {
            diagScore1 = 3;
            z = 28;
          }
        }
        if (areEqual(player, array[i+z], array[i+7+z], array[i+14+z])) {
          diagScore1 = 1;
          z = 28;
        }
        z += 7;
      }
      if (diagScore1) { this.gameScoreSet(diagScore1, player); }
    }
    //check down to left
    for (var i = 2; i < 9; i++) {
      var diagScore2 = 0;
      z = 0;
      while (z < 20) {
        if (z < 5) {
          if (areEqual(player, array[i], array[i+5], array[i+10], array[i+15], array[i+20], array[i+25])) {
            diagScore2 = 20;
            z = 20;
          }
        }
        if (z < 10) {
          if (areEqual(player, array[i+z], array[i+5+z], array[i+10+z], array[i+15+z], array[i+20+z])) {
            diagScore2 = 10;
            z = 20;
          }
        }
        if (z < 15) {
          if (areEqual(player, array[i+z], array[i+5+z], array[i+10+z], array[i+15+z])) {
            diagScore2 = 3;
            z = 20;
          }
        }
        if (areEqual(player, array[i+z], array[i+5+z], array[i+10+z])) {
          diagScore2 = 1;
          z = 20;
        }       
        z += 5;
      }
      if (diagScore2) { 
        this.gameScoreSet(diagScore2, player); 
      }
    }

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
    alert('end of game');
  },

//TODO: Update this for new game scoring and wire up to finalScoreCheck
  scoreSet: function(id){
    if (id === 1) {
      alert('Player 1 Wins!');
      this.set({playerScore: this.get('playerScore')+1});
      this.newBoard();
    } else if (id === 2) {
      alert('Player 2 Wins!');
      this.set({computerScore: this.get('computerScore')+1});
      this.newBoard();
    } else if (id === 3) {
      alert('Tie!');
      this.set({tieScore: this.get('tieScore')+1});
      this.newBoard();
    }
  },

  newBoard: function(){
    this.set({newGame: true, moveCount: 0});
  },

//TODO: score check each time a piece is played?
  boardChangeListener: function(){
    this.get('board').on('change:p1SqScore change:p2SqScore', function(){
      this.set({moveCount: this.get('moveCount')+1});
      if (this.get('moveCount') > 35) {
        this.finalScoreCheck();
      }
    }, this);
    // this.get('board').on('change:p2SqScore', function(){
      // this.winCheck(this.get('board').get('p2SqScore'));
    // }, this);
  }
});
