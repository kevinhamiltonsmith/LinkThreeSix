var Game = Backbone.Model.extend({

  initialize: function(){
    this.set({playerScore: 0, computerScore: 0, tieScore: 0, gameScore1: 0, gameScore2: 0, newGame: false, moveCount: 0});
    this.set('board', new Board());

    this.boardChangeListener();
//TODO: test data
    // this.finalScoreCheck();
  },

//TODO: fix scoring math bug
  winCheck: function(array){
    //check rows
    var rowScore, colScore, diagScore1, diagScore2;
    for (var i = 0; i < 25 ; i += 5) {
      // var rowScore = array[i] + array[i+1] + array[i+2] + array[i+3] + array[i+4];
      //chaeck 4 in a row

      //check 3 in a row
      for (var z = 0; z < 3; z++) {
        if (array[i] === array[i+1] === array[i+2]){
          rowScore = 1;
        }
      }
      this.singleScoreCheck(rowScore);
    }
    //check columns
    for (var k = 0; k < 5 ; k ++) {
      var colScore = array[k] + array[k+5] + array[k+10] + array[k+15] + array[k+20];
      this.singleScoreCheck(colScore);
    }
    //check diagonals
    //check down to right
    for (var m = -2; m < 3; m++) {
      var diagScore1 = array[m] + array[m+6] + array[m+12] + array[m+18] + array[m+24]
      this.singleScoreCheck(diagScore1);
    }
    //check down to left
    for (var m = 2; m < 7; m++) {
      var diagScore2 = array[m] + array[m+4] + array[m+8] + array[m+12] + array[m+16]
      this.singleScoreCheck(diagScore2);
    }
  },

//TODO: check these values incrementally
  singleScoreCheck: function(score) {
    switch(score) {
      case 5:
        this.gameScoreSet(1, 5);
        break;
      case 4:
        this.gameScoreSet(1, 3);
        break;
      case 3:
        this.gameScoreSet(1, 1);
        break;
      case 50:
        this.gameScoreSet(2, 5);
        break;
      case 40:
        this.gameScoreSet(2, 3);
        break;
      case 30:
        this.gameScoreSet(2, 1);
        break;
    }
  },

//TODO: check array values?
  finalScoreCheck: function() {
    this.winCheck(this.get('board').get('p1SqScore'));
    this.winCheck(this.get('board').get('p2SqScore'));
    var finalScore1 = this.get('gameScore1');
    var finalScore2 = this.get('gameScore2');
    alert('end of game');
  },

  gameScoreSet: function(id, score) {
    if (id == 1) {
      this.set({gameScore1: this.get('gameScore1')+score});
      console.log(this.get('gameScore1'));
    }
    if (id == 2) {
      this.set({gameScore2: this.get('gameScore2')+score});
      console.log(this.get('gameScore2'));
    }
  },

//TODO: Update this for new game scoring and wire up to finalScoreCheck
  scoreSet: function(id){
    if (id === 1) {
      alert('Player 1 Wins!');
      this.set({playerScore: this.get('playerScore')+1});
      this.newBoard();
    } else if (id === 2) {
      alert('Player 2 Wins!');
      this.set({computerScore: this.get('computerScore')+1});
      this.newBoard();
    } else if (id === 3) {
      alert('Tie!');
      this.set({tieScore: this.get('tieScore')+1});
      this.newBoard();
    }
  },

  newBoard: function(){
    this.set({newGame: true, moveCount: 0});
  },

//TODO: score check each time a piece is played?
  boardChangeListener: function(){
    this.get('board').on('change:p1SqScore change:p2SqScore', function(){
      this.set({moveCount: this.get('moveCount')+1});
      if (this.get('moveCount') > 35) {
        this.finalScoreCheck();
      }
    }, this);
    // this.get('board').on('change:p2SqScore', function(){
      // this.winCheck(this.get('board').get('p2SqScore'));
    // }, this);
  }
});
