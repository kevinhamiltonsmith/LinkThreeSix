var Board = Backbone.Model.extend({

  initialize: function(){
    this.set({board: [0,0,0,0,0,0,0,0,0], turn: "player"});
  },

  setSquare: function(mark, position){
    //clone array here to preserve Backbone change listener in BoardView
    if (mark === 0) {
      if (this.get("turn") === "player") {
        mark = "X";
        this.computerMove();
      } else {
        mark = "O";
        this.playerMove();
      }
      var newSquares = this.get('board').slice(0);
      newSquares[position] = mark;
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
