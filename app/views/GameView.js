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
    var html ='' +
      '<div class="navbar" id="nav1">' +
        '<div class="row">' +
          '<a class="toggle" gumby-trigger=".ul-nav" href="#"><i class="icon-menu"></i></a>' +
          '<h3 class="four columns logo">' +
            '<a href="index.html" class="main-logo">Six Tac Toe</a>' +
          '</h3>' +
          '<div class="logged-in-nav">' +
            '<ul class="eight columns ul-nav">' +
              '<li><a href="#">New Game</a></li>' +
              '<li><a href="#">How to Play</a></li>' +
              '<li><a href="#">About</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
      '</div>';
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
