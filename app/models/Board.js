var Board = Backbone.Model.extend({

  initialize: function(){
    this.set({board: [[0,"hidden"],[0,"hidden"],[0,"hidden"],[0,"hidden"],[0,"hidden"],[0,"hidden"],[0,"hidden"],[0,"hidden"],[0,"hidden"]], turn: "player"});
  },

  setSquare: function(mark, position){
    //clone array here to preserve Backbone change listener in BoardView
    if (mark === 0) {
      var color = "playerBlue";
      if (this.get("turn") === "player") {
        mark = "X";
        this.computerMove();
      } else {
        mark = "O";
        color = "computerRed";
        this.playerMove();
      }
      var newSquares = this.get('board').slice(0);
      newSquares[position] = [mark, color];
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
