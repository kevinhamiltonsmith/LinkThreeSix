var GameView = Backbone.View.extend({

  className: 'game-view',

  events: {
    'click .new-game-button': function(event){
      $('.end-game').fadeOut('fast');
      this.model.newBoard();
    }
  },

  initialize: function(){
    this.boardView = new BoardView({model: this.model.get('board')});
    this.gameScoreView = new GameScoreView({model: game});
    this.gameScoreboardView = new GameScoreboardView({model: game});
    this.endGameView = new EndGameView({model: game});

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

  render: function(){
    var html = "<h1>Connect Three or More</h1>";
    var clear = "<div class='clear'></div>";

    return this.$el.html([
      html,
      this.gameScoreboardView.$el,
      this.gameScoreView.$el,
      this.endGameView.$el,
      clear,
      this.boardView.$el
    ]);
  }
});