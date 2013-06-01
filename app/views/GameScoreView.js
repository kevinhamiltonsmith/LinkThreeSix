var GameScoreView = Backbone.View.extend({

  className: 'game-score-board game-score-hide',

  initialize: function() {
    this.model.on('change:gameScore1 change:gameScore2', function(){
      var finalScore1 = this.model.get('gameScore1');
      var finalScore2 = this.model.get('gameScore2');
      var winner = "no-winner"
      if (finalScore1 > finalScore2) {
        winner = "player-1-win";
      } else if (finalScore1 < finalScore2) {
        winner = "player-2-win";
      }
      this.render(winner);
    }, this);
  },

  render: function(winner) {
    var html = "<h2>Game Score</h2>" +
                "<div class='player-score'>Player 1: <span>" + this.model.get('gameScore1') + "</span></div>" +
                "<div class='computer-score'>Player 2: <span>" + this.model.get('gameScore2') + "</span></div>";
    var button = "<button class='new-game-button'>New Game</button>";

    $('.game-score-board').addClass(winner);
    this.$el.html(html).slideDown('slow');
    $('.game-score-board').after(button);
    return this;
  }
});
