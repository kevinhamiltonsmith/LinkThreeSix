var EndGameView = Backbone.View.extend({

  className: 'end-game hide',

  initialize: function() {
    this.render();

    this.model.on('change:prevWinner', function(){
      this.render();
    }, this);
  },

  render: function() {
    var html = ""+
      "<h3>" + this.model.get('prevWinner') + "</h3>" +
      "<h4>Final Score</h4>" +
      "<h4 class='player-score'>Player 1: <span>" + this.model.get('gameScore1') + "</span></h4>" +
      "<h4 class='computer-score'>Player 2: <span>" + this.model.get('gameScore2') + "</span></h4>" +
      "<button class='new-game-button'>New Game</button>" +
      "<div class='close-button'><i class='icon-cancel-circled'></i></div>";
    return this.$el.html(html);
  }
});
