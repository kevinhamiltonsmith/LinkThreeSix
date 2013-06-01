var GameScoreView = Backbone.View.extend({

  className: 'game-score-board game-score-hide',

  initialize: function() {
    this.model.on('change:gameScore1 change:gameScore2', function(){
      this.render();
    }, this);
  },

  render: function() {
    var html = "<h2>Game Score</h2>" +
                "<div class='player-score'>Player 1: <span>" + this.model.get('gameScore1') + "</span></div>" +
                "<div class='computer-score'>Player 2: <span>" + this.model.get('gameScore2') + "</span></div>";
    $('game-score-board').removeClass('game-score-hide');
    this.$el.html(html).slideDown('slow');
    return this;
  }
});
