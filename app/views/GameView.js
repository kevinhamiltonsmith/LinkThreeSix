var GameView = Backbone.View.extend({

  className: 'game-view',

  initialize: function(){
    this.boardView = new BoardView({model: this.model.get('board')});
    this.gameScoreView = new GameScoreView({model: game});

    this.model.on('change:playerScore change:computerScore change:tieScore', function(){
      this.render();
    }, this);

    this.model.on('change:newGame', function(){
      this.$el.children().detach();
      this.model.set('newGame', false);
      if(this.boardView) {
        this.boardView.remove();
      }
      this.model.set('board', new Board());
      this.boardView = new BoardView({model: this.model.get('board')});
      this.model.boardChangeListener();
      this.render();
    }, this);
  },

//TODO: put each scoreboard in a separate view
  render: function(){
    var html = "<h1>Connect Three</h1>" +
                "<div class='scoreboard'>" +
                  "<h2>Total Wins</h2>" +
                  "<div class='player-score'>Player 1: <span>" + this.model.get('playerScore') + "</span></div>" +
                  "<div class='computer-score'>Player 2: <span>" + this.model.get('computerScore') + "</span></div>" +
                  "<div class='tie-score'>Tie: <span>" + this.model.get('tieScore') + "</span></div>" +
                "</div>";
    var clear = "<div class='clear'></div>";
    return this.$el.html([
      html,
      this.gameScoreView.$el,
      clear,
      this.boardView.$el,
    ]);
  }
});