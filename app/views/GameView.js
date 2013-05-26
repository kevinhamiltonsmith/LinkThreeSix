var GameView = Backbone.View.extend({

  className: 'game-view',

  initialize: function(){
    this.boardView = new BoardView({model: board});
  },

  render: function(){
    var html = "<h1>Backbone Tic-Tac-Toe</h1>" +
                  "<div class='scoreboard'>" +
                    "<h2>Wins</h2>" +
                    "<div class='player-score'>Player: " + this.model.get('playerScore') + "</div>" +
                    "<div class='comp-score'>Computer: " + this.model.get('computerScore') + "</div>" +
                  "</div>";
    return this.$el.html([
      html,
      this.boardView.$el
    ]);
  }
});