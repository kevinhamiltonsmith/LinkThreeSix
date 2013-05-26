var board = new Board();
var game = new Game();
var gameView = new GameView({model: game});
$('body').append(gameView.render());
