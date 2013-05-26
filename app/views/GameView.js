var GameView = Backbone.View.extend({

  className: 'game-view',

  initialize: function(){
    this.boardView = new BoardView({model: board});
  },

  render: function(){
    var html = "<h1>Backbone Tic-Tac-Toe</h1>";
    return this.$el.html([
      html,
      this.boardView.$el
    ]);
  }
});