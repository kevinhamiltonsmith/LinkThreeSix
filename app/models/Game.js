var Game = Backbone.Model.extend({

  initialize: function(){
    this.set({playerScore: 0, computerScore: 0, tieScore: 0});
    this.set('board', new Board());

    this.get('board').on('change', function(){
      this.winCheck();
    }, this);
  },

  winCheck: function(){
    var gameBoard = this.get('board').get('board');
    var scores = [];
    for (var j = 0; j < gameBoard.length; j++) {
      scores.push(gameBoard[j][2]);
    }
    //check rows
    for (var i = 0; i < 9 ; i += 3) {
      var rowScore = scores[i] + scores[i+1] + scores[i+2];
      if (rowScore === 15) {
        alert('Player 2 Wins!');
        this.scoreSet(2);
      } else if (rowScore === 3) {
        alert('Player 1 Wins!');
        this.scoreSet(1);
      }
    }
    //check columns
    for (var k = 0; k < 3 ; k ++) {
      var colScore = scores[k] + scores[k+3] + scores[k+6];
      if (colScore === 15) {
        alert('Player 2 Wins!');
        this.scoreSet(2);
      } else if (colScore === 3) {
        alert('Player 1 Wins!');
        this.scoreSet(1);
      }
    }
    //check diagonals
    var diagScore1 = scores[0] + scores[4] + scores [8];
    var diagScore2 = scores[2] + scores[4] + scores [6];
    if (diagScore1 === 15 || diagScore2 === 15) {
      alert('Player 2 Wins!');
      this.scoreSet(2);
    } else if (diagScore1 === 3 || diagScore2 === 3) {
      alert('Player 1 Wins!');
      this.scoreSet(1);
    }
  },

  scoreSet: function(id){
    if (id === 1) {
      this.set({playerScore: this.get('playerScore')+1});
    } else if (id === 2) {
      this.set({computerScore: this.get('computerScore')+1});
    }
  }
});
