var GameView = Backbone.View.extend({

  className: 'game-view',

  initialize: function(){
    this.boardView = new BoardView({model: this.model.get('board')});
    this.gameScoreView = new GameScoreView({model: game});
    this.gameScoreboardView = new GameScoreboardView({model: game});

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
    var html = "<h1>Connect Three</h1>";
    var clear = "<div class='clear'></div>";
    return this.$el.html([
      html,
      this.gameScoreboardView.$el,
      this.gameScoreView.$el,
      clear,
      this.boardView.$el,
    ]);
  }
});