var Game = Backbone.Model.extend({

  initialize: function(){
    this.set({playerScore: 0, computerScore: 0, tieScore: 0, newGame: false, moveCount: 0});
    this.set('board', new Board());

    this.boardChangeListener();
  },

  winCheck: function(){
    var gameBoard = this.get('board').get('board');
    var scores = [];
    for (var j = 0; j < gameBoard.length; j++) {
      scores.push(gameBoard[j][2]);
    }
    //check rows
    for (var i = 0; i < 25 ; i += 5) {
      var rowScore = scores[i] + scores[i+1] + scores[i+2] + scores[i+3] + scores[i+4];
      if (rowScore === 50) {
        this.scoreSet(2);
      } else if (rowScore === 5) {
        this.scoreSet(1);
      }
    }
    //check columns
    for (var k = 0; k < 5 ; k ++) {
      var colScore = scores[k] + scores[k+5] + scores[k+10] + scores[k+15] + scores[k+20];
      if (colScore === 50) {
        this.scoreSet(2);
      } else if (colScore === 5) {
        this.scoreSet(1);
      }
    }
    //check diagonals
    var diagScore1 = scores[0] + scores[6] + scores [12] + scores[18] + scores[24];
    var diagScore2 = scores[4] + scores[8] + scores [12] + scores[16] + scores[20];
    if (diagScore1 === 50 || diagScore2 === 50) {
      this.scoreSet(2);
    } else if (diagScore1 === 5 || diagScore2 === 5) {
      this.scoreSet(1);
    }

    this.set({moveCount: this.get('moveCount')+1});
    if (this.get('moveCount') > 49) {
      this.scoreSet(3);
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
    this.get('board').on('change', function(){
      this.winCheck();
    }, this);
  }
});
