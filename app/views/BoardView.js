var BoardView = Backbone.View.extend({

  tagName: 'table',

  className: 'board-view',

  initialize: function(){
    this.model.on('change:board', function(){
      this.render();
    }, this);
  },

  render: function(){
    var board = this.model.get('board');
    var html ="<tr class='row-a'>" +
                "<td class='a0'>" + board[0] + "</td><td class='a1'>" + board[1] + "</td><td class='a2'>" + board[2] + "</td>" +
              "</tr>" +
              "<tr class='row-b'>" +
                "<td class='b0'>" + board[3] + "</td><td class='b1'>" + board[4] + "</td><td class='b2'>" + board[5] + "</td>" +
              "</tr>" +
              "<tr class='row-c'>" +
                "<td class='c0'>" + board[6] + "</td><td class='c1'>" + board[7] + "</td><td class='c2'>" + board[8] + "</td>" +
              "</tr>";
    return this.$el.html(html);
  }
});