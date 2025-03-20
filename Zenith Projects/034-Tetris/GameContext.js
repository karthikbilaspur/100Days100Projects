import React, { createContext, useState } from 'react';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    board: Array(20).fill(null).map(() => Array(10).fill(0)),
    currentTetrimino: null,
    nextTetrimino: null,
    score: 0,
    lines: 0,
    level: 1,
    gameOver: false,
    powerUps: [],
    gameMode: 'marathon',
    aiOpponent: null,
    leaderboard: [],
  });

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContext, GameProvider };