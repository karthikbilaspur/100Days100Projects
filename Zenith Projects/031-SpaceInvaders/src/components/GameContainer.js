import React, { useReducer, useEffect } from 'react';
import Game from '../components/Game';
import { gameReducer } from '../reducers/gameReducer';
import { gameActions } from '../actions/gameActions';

const GameContainer = () => {
  const [gameState, dispatch] = useReducer(gameReducer, {
    aliens: [],
    player: { x: 0, y: 0, score: 0, level: 1, lives: 3 },
    powerUps: [],
    gameOver: false,
    gamePaused: false,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(gameActions.updateGameState(gameState));
    }, 16);

    return () => clearInterval(intervalId);
  }, [gameState]);

  return <Game gameState={gameState} dispatch={dispatch} />;
};

export default GameContainer;