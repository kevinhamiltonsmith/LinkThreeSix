var EndGameView = Backbone.View.extend({

  className: 'end-game-modal',

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
      console.log('trigger change prevWinner');
    var html = '' +
      '<div class="modal" id="modal1">' +
        '<div class="content">' +
          '<a class="close switch" gumby-trigger="|#modal1"><i class="icon-cancel" /></i></a>' +
          '<div class="row">' +
            '<div class="ten columns centered center-text">' +
              '<h3>' + this.model.get('prevWinner') + '</h3>' +
              '<h4>Play Again?</h4>' +
              '<button class="new-game-button">New Game</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    return this.$el.html(html);
  }
});
