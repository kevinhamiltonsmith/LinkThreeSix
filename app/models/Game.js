var Game = Backbone.Model.extend({

  initialize: function(){
    this.set({playerScore: 0, computerScore: 0, tieScore: 0, newGame: false, moveCount: 0});
    this.set('board', new Board());

    this.boardChangeListener();
  },

  winCheck: function(array){
    var scores = [];

//TODO: use this array argument
    console.log(array);

    // var gameBoard = this.get('board').get('board');
    // for (var j = 0; j < gameBoard.length; j++) {
    //   scores.push(gameBoard[j][2]);
    // }

    //check rows
    for (var i = 0; i < 25 ; i += 5) {
      var rowScore = scores[i] + scores[i+1] + scores[i+2] + scores[i+3] + scores[i+4];
      this.singleScoreCheck(rowScore);
    }
    //check columns
    for (var k = 0; k < 5 ; k ++) {
      var colScore = scores[k] + scores[k+5] + scores[k+10] + scores[k+15] + scores[k+20];
      this.singleScoreCheck(colScore);
    }
    //check diagonals
    //check down to right
    for (var m = -2; m < 3; m++) {
      var diagScore1 = scores[m] + scores[m+6] + scores[m+12] + scores[m+18] + scores[m+24]
      this.singleScoreCheck(diagScore1);
    }
    //check down to left
    for (var m = 2; m < 7; m++) {
      var diagScore2 = scores[m] + scores[m+4] + scores[m+8] + scores[m+12] + scores[m+16]
      this.singleScoreCheck(diagScore2);
    }
//TODO: update this for new boardChangeListener
    this.set({moveCount: this.get('moveCount')+1});
    if (this.get('moveCount') > 49) {
      this.scoreSet(3);
    }
  },

  singleScoreCheck: function (score) {
    if (score === 30) {
      this.scoreSet(2);
    } else if (score === 3) {
      this.scoreSet(1);
    }
  },

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

  boardChangeListener: function(){
    this.get('board').on('change:score1', function(){
      this.winCheck(this.get('board').get('score1'));
    }, this);
    this.get('board').on('change:score2', function(){
      this.winCheck(this.get('board').get('score2'));
    }, this);
  }
});
