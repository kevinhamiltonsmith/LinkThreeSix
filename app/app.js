var board = new Board();
var gameView = new BoardView({model: board});
$('body').append(gameView.render());
