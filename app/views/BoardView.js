var BoardView = Backbone.View.extend({

  initialize: function(){

  },

  render: function(){
    var html ="<table>" +
                "<tr class='row-a'>" +
                  "<td class='a0'></td><td class='a1'></td><td class='a2'></td>" +
                "</tr>" +
                "<tr class='row-b'>" +
                  "<td class='b0'></td><td class='b1'></td><td class='b2'></td>" +
                "</tr>" +
                "<tr class='row-c'>" +
                  "<td class='c0'></td><td class='c1'></td><td class='c2'></td>" +
                "</tr>" +
              "</table>";

    return this.$el.html(html);
  }
});