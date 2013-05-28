var Game = Backbone.Model.extend({

  initialize: function(){
    this.set({playerScore: 0, computerScore: 0, tieScore: 0, newGame: false, moveCount: 0});
    this.set('board', new Board());

    this.boardChangeListener();
  },

  winCheck: function(array){
    //check rows
    for (var i = 0; i < 25 ; i += 5) {
      var rowScore = array[i] + array[i+1] + array[i+2] + array[i+3] + array[i+4];
      this.singleScoreCheck(rowScore);
    }
    //check columns
    for (var k = 0; k < 5 ; k ++) {
      var colScore = array[k] + array[k+5] + array[k+10] + array[k+15] + array[k+20];
      this.singleScoreCheck(colScore);
    }
    //check diagonals
    //check down to right
    for (var m = -2; m < 3; m++) {
      var diagScore1 = array[m] + array[m+6] + array[m+12] + array[m+18] + array[m+24]
      this.singleScoreCheck(diagScore1);
    }
    //check down to left
    for (var m = 2; m < 7; m++) {
      var diagScore2 = array[m] + array[m+4] + array[m+8] + array[m+12] + array[m+16]
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
