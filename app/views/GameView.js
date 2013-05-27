var GameView = Backbone.View.extend({

  className: 'game-view',

  initialize: function(){
    this.boardView = new BoardView({model: this.model.get('board')});

    this.model.on('change:playerScore change:computerScore change:tieScore', function(){
      this.render();
    }, this);

    this.model.on('change:newGame', function(){
      this.model.set('newGame', false);
      if(this.boardView) {
        this.boardView.remove();
      }
      this.model.set('board', new Board());
      this.boardView = new BoardView({model: this.model.get('board')});
      this.render();
      // debugger;
    }, this);
  },

  render: function(){
    var html = "<h1>Backbone Tic-Tac-Toe</h1>" +
                  "<div class='scoreboard'>" +
                    "<h2>Wins</h2>" +
                    "<div class='player-score'>Player 1: <span>" + this.model.get('playerScore') + "</span></div>" +
                    "<div class='computer-score'>Player 2: <span>" + this.model.get('computerScore') + "</span></div>" +
                    "<div class='tie-score'>Tie: <span>" + this.model.get('tieScore') + "</span></div>" +
                  "</div>";
    return this.$el.html([
      html,
      this.boardView.$el
    ]);
  }
});