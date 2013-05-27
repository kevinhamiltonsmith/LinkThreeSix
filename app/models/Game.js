var Game = Backbone.Model.extend({

  initialize: function(){
    this.set({playerScore: 0, computerScore: 0, tieScore: 0});
    this.set('board', new Board());
  },

  winCheck: function(){
    var gameBoard = this.get('board').get('board');
    var scores = [];
    for (var i = 0; i < gameBoard.length; i++) {
      scores.push(gameBoard[i][2]);
    }
    console.log(scores);
    //check rows

    //check columns

    //check diagonals
  }
});
