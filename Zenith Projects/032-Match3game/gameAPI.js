const express = require('express');
const router = express.Router();
const GameController = require('./gameController');
const Game = require('./game');

const game = new Game();
const gameController = new GameController(game);

router.post('/makeMove', (req, res) => {
  gameController.handleMakeMove();
  res.json({
    score: gameController.getScore(),
    highScore: gameController.getHighScore(),
    level: gameController.getLevel()
  });
});

module.exports = router;