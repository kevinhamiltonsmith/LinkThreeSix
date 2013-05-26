var BoardView = Backbone.View.extend({

  tagName: 'table',

  className: 'board-view',

  events: {
    'click td': function(event){
      var squareValue = parseInt($(event.currentTarget).html());
      var position = $(event.currentTarget).data("position");
      this.changeSquare(squareValue, position);
    }
  },

  changeSquare: function(mark, position){
    //TODO: set correct mark value
    this.model.setSquare(mark+1, position);
  },

  initialize: function(){
    this.model.on('change:board', function(){
      this.render();
    }, this);
  },

  render: function(){
    var board = this.model.get('board');
    var html ="<tr class='row-a'>" +
                "<td data-position='0' class='a0'>" + board[0] + "</td><td data-position='1' class='a1'>" + board[1] + "</td><td data-position='2' class='a2'>" + board[2] + "</td>" +
              "</tr>" +
              "<tr class='row-b'>" +
                "<td data-position='3' class='b0'>" + board[3] + "</td><td data-position='4' class='b1'>" + board[4] + "</td><td data-position='5' class='b2'>" + board[5] + "</td>" +
              "</tr>" +
              "<tr class='row-c'>" +
                "<td data-position='6' class='c0'>" + board[6] + "</td><td data-position='7' class='c1'>" + board[7] + "</td><td data-position='8' class='c2'>" + board[8] + "</td>" +
              "</tr>";
    return this.$el.html(html);
  }
});