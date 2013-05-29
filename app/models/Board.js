var Board = Backbone.Model.extend({

  initialize: function(){
    var initialBoard = [];
    var p1SqScore = [];
    var p2SqScore = [];
    for (var i = 0; i < 25; i++) {
      initialBoard.push([0,"hidden"]);
      p1SqScore.push(0);
      p2SqScore.push(0);
    }
    this.set({board: initialBoard, turn: "player", p1SqScore: p1SqScore, p2SqScore: p2SqScore});
  },

  setSquare: function(mark, position){
    if (mark === 0) {
      var color = "playerBlue";
      var score = 1;
      if (this.get("turn") === "player") {
        mark = "X";
        this.setNewBoard(mark, position, color);
        this.computerMove(position);
      } else {
        mark = "O";
        color = "computerRed";
        score = 10;
        this.setNewBoard(mark, position, color);
        this.playerMove(position);
      }
    }
  },

  setNewBoard: function(mark, position, color) {
    //clone array here to preserve Backbone change listener in BoardView
    var newSquares = this.get('board').slice(0);
    newSquares[position] = [mark, color];
    this.set('board', newSquares);
  },

  computerMove: function(position) {
    this.set({turn: "computer"});
    var p1SqScoreNew = this.get('p1SqScore').slice(0);
    p1SqScoreNew[position] = 1;
    this.set('p1SqScore', p1SqScoreNew);
  },

  playerMove: function(position) {
    this.set({turn: "player"});
    var p2SqScoreNew = this.get('p2SqScore').slice(0);
    p2SqScoreNew[position] = 10;
    this.set('p2SqScore', p2SqScoreNew);
  }
});
