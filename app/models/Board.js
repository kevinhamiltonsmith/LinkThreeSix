var Board = Backbone.Model.extend({

  initialize: function(){
    this.set({board: [0,0,0,0,0,0,0,0,0]});
  },

  setSquare: function(mark, position){
    //clone array here to preserve Backbone change listener in BoardView
    if (mark === 0) {
      mark = "X";
      var newSquares = this.get('board').slice(0);
      newSquares[position] = mark;
      this.set('board', newSquares);
    }
  }

});
