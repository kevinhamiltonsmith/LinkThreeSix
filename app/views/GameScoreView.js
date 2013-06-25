var GameScoreView = Backbone.View.extend({

  initialize: function() {
    this.render();

    this.model.on('change:gameScore1 change:gameScore2', function(){
      var finalScore1 = this.model.get('gameScore1');
      var finalScore2 = this.model.get('gameScore2');
      var winner = "no-winner-tie";
      if (finalScore1 > finalScore2) {
        winner = "player-1-win";
      } else if (finalScore1 < finalScore2) {
        winner = "player-2-win";
      } else if (finalScore1 === 0 && finalScore2 === 0) {
        winner = "no-winner";
      }

      this.render(winner);
    }, this);
  },

  render: function(winner) {
    var html = "<h2>Game Score</h2>" +
                "<div class='player-score'>Player 1: <span>" + this.model.get('gameScore1') + "</span></div>" +
                "<div class='computer-score'>Player 2: <span>" + this.model.get('gameScore2') + "</span></div>";
    return this.$el.html(html).removeClass().addClass('game-score-board '+winner);
  }
});
