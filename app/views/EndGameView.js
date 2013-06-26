var EndGameView = Backbone.View.extend({

  className: 'end-game hide',

  events: {
    'click .new-game-button': function(event){
      this.$el.fadeOut();
    }
  },

  initialize: function() {
    this.render();

    this.model.on('change:prevWinner', function(){
      this.render();
    }, this);
  },

  render: function() {
    var html = ""+
      "<h3>" + this.model.get('prevWinner') + "</h3>" +
      "<h3>" + this.model.get('gameScore1') + "</h3>" +
      "<h3>" + this.model.get('gameScore2') + "</h3>" +
      "<h4>Play Again?</h4>" +
      "<button class='new-game-button'>New Game</button>";
    return this.$el.html(html);
  }
});
