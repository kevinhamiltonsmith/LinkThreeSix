var TurnView = Backbone.View.extend({

  className: 'turn',

  initialize: function() {
    this.render();
    console.log('TurnView', 'this.model', this.model);

    this.model.on('change:turn', this.changeTurn, this);
  },

  changeTurn: function() {
    this.render();
  },

  render: function() {
    var html =  ""+
      "<h3>Current Move</h3>" +
      "<div class='player-turn'>" +
        "<h4 class='" + this.model.get('turnMark') +"'>" + this.model.get('turnMark') + "</h4>" +
        "<p>" + this.model.get('turn') + "</p>" +
      "</div>";

    return this.$el.html(html);
  }
});