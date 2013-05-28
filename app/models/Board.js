var Board = Backbone.Model.extend({

  initialize: function(){
    var initialBoard = [];
    for (var i = 0; i < 25; i++) {
      initialBoard.push([0,"hidden",0]);
    }
    this.set({board: initialBoard, turn: "player"});
  },

  setSquare: function(mark, position){
    //clone array here to preserve Backbone change listener in BoardView
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
      var newSquares = this.get('board').slice(0);
      newSquares[position] = [mark, color, score];
      this.set('board', newSquares);
    }
  },

  computerMove: function() {
    this.set({turn: "computer"});
  },

  playerMove: function() {
    this.set({turn: "player"});
  }

});
