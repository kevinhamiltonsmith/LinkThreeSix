var Board = Backbone.Model.extend({

  initialize: function(){
    var initialBoard = [];
    var score1 = [];
    var score2 = [];
    for (var i = 0; i < 25; i++) {
      initialBoard.push([0,"hidden"]);
      score1.push([0]);
      score2.push([0]);
    }
    this.set({board: initialBoard, turn: "player", score1: score1, score2: score2});
  },

  setSquare: function(mark, position){
    if (mark === 0) {
      var color = "playerBlue";
      var score = 1;
      if (this.get("turn") === "player") {
        mark = "X";
        this.computerMove();
      } else {
        mark = "O";
        color = "computerRed";
        score = 10;
        this.playerMove();
      }
      //clone array here to preserve Backbone change listener in BoardView 
      var newSquares = this.get('board').slice(0);
      var newscore1 = this.get('score1').slice(0);
      var newscore2 = this.get('score2').slice(0);
      newSquares[position] = [mark, color];
      newscore1[position] = 1;
      newscore2[position] = 10;
      this.set('board', newSquares);
      this.set('score1', newscore1);
      this.set('score2', newscore2);
    }
  },

  computerMove: function() {
    this.set({turn: "computer"});
  },

  playerMove: function() {
    this.set({turn: "player"});
  }

});
