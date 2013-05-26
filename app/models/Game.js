var Game = Backbone.Model.extend({

  initialize: function(){
    this.set({playerScore: 0, computerScore: 0});
    this.set('board', new Board());
  },

  scoreCheck: function(){

  }
});
