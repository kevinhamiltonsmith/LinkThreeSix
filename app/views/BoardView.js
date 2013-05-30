var BoardView = Backbone.View.extend({

  tagName: 'table',

  className: 'board-view',

  events: {
    'click td': function(event){
      var squareValue = parseInt($(event.currentTarget).html());
      var position = $(event.currentTarget).data("position");
      this.model.setSquare(squareValue, position);
    }
  },

  initialize: function(){
    this.render();

    this.model.on('change:board', function(){
      this.render();
    }, this);
  },

  render: function(){
    var board = this.model.get('board');
    var html = [];
    var n = 0;
    for (var i = 0; i < 6; i++) {
      html.push("<tr class='row-"+i+"'>");
      for (var j = 0; j < 6; j++){
        html[i] = html[i] + "<td data-position='"+n+"' class='col"+j+" "+board[n][1]+"'>" + board[n][0] + "</td>";
        n++;
      }
      html[i] = html[i] + "</tr>";
    }
    this.$el.html(html);
    return this;
  }
});