var GameScoreView = Backbone.View.extend({

  className: 'gameboard',

  initialize: function() {
    this.render();
    
    this.model.on('change:gameScore1 change:gameScore2', function(){
      this.render();
    }, this);
  },

  render: function() {
    var html = "<h2>Game Score</h2>" +
                "<div class='player-score'>Player 1: <span>" + this.model.get('gameScore1') + "</span></div>" +
                "<div class='computer-score'>Player 2: <span>" + this.model.get('gameScore2') + "</span></div>";
    return this.$el.html(html);
  }
});
