class GameController {
    constructor(game) {
      this.game = game;
    }
  
    handleMakeMove() {
      this.game.makeMove();
    }
  
    getScore() {
      return this.game.getScore();
    }
  
    getHighScore() {
      return this.game.getHighScore();
    }
  
    getLevel() {
      return this.game.getLevel();
    }
  }
  
  module.exports = GameController;