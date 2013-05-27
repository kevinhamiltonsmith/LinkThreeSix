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
    //TODO: refactor this html -> for (var i = 0; i < 9; i++) {}
    var html ="<tr class='row-a'>" +
                "<td data-position='0' class='a0 col0 "+board[0][1]+"'>" + board[0][0] + "</td>" +
                "<td data-position='1' class='a1 col1 "+board[1][1]+"'>" + board[1][0] + "</td>" +
                "<td data-position='2' class='a2 col2 "+board[2][1]+"'>" + board[2][0] + "</td>" +
              "</tr>" +
              "<tr class='row-b'>" +
                "<td data-position='3' class='b0 col0 "+board[3][1]+"'>" + board[3][0] + "</td>" +
                "<td data-position='4' class='b1 col1 "+board[4][1]+"'>" + board[4][0] + "</td>" +
                "<td data-position='5' class='b2 col2 "+board[5][1]+"'>" + board[5][0] + "</td>" +
              "</tr>" +
              "<tr class='row-c'>" +
                "<td data-position='6' class='c0 col0 "+board[6][1]+"'>" + board[6][0] + "</td>" +
                "<td data-position='7' class='c1 col1 "+board[7][1]+"'>" + board[7][0] + "</td>" +
                "<td data-position='8' class='c2 col2 "+board[8][1]+"'>" + board[8][0] + "</td>" +
              "</tr>";
    this.$el.html(html);
    return this;
  }
});