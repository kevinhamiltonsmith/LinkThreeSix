var GameScoreboardView = Backbone.View.extend({

  className: 'scoreboard',

  initialize: function() {
    this.render();
    
    this.model.on('change:playerScore change:computerScore change:tieScore', function(){
      $('.new-game-button').slideDown();
      this.render();
    }, this);
  },

  render: function() {
    var html =  "<h2>Total Wins</h2>" +
                "<div class='player-score'>Player 1: <span>" + this.model.get('playerScore') + "</span></div>" +
                "<div class='computer-score'>Player 2: <span>" + this.model.get('computerScore') + "</span></div>" +
                "<div class='tie-score'>Tie: <span>" + this.model.get('tieScore') + "</span></div>";   
    return this.$el.html(html);
  }
});
