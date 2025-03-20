import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import Tetrimino from './Tetrimino';
import NextTetrimino from './NextTetrimino';
import GameInfo from './GameInfo';
import StartScreen from './StartScreen';
import EndScreen from './EndScreen';
import Leaderboard from './Leaderboard';
import PowerUps from './PowerUps';
import LevelingSystem from './LevelingSystem';
import GameModes from './GameModes';
import AIOpponent from './AIOpponent';


const Game = () => {
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
  });


  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          moveTetrimino(-1);
          break;
        case 'ArrowRight':
          moveTetrimino(1);
          break;
        case 'ArrowDown':
          dropTetrimino();
          break;
        case 'ArrowUp':
          rotateTetrimino();
          break;
        default:
          break;
      }
    };


    document.addEventListener('keydown', handleKeyDown);


    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState]);


  const moveTetrimino = (direction) => {
    const { currentTetrimino, board } = gameState;
    if (!currentTetrimino) return;
    const newX = currentTetrimino.x + direction;
    if (isValidPosition(newX, currentTetrimino.y, currentTetrimino.shape)) {
      setGameState((prevState) => ({ ...prevState, currentTetrimino: { ...currentTetrimino, x: newX } }));
    }
  };


  const dropTetrimino = () => {
    const { currentTetrimino, board } = gameState;
    if (!currentTetrimino) return;
    let newY = currentTetrimino.y;
    while (isValidPosition(currentTetrimino.x, newY + 1, currentTetrimino.shape)) {
      newY++;
    }
    setGameState((prevState) => ({ ...prevState, currentTetrimino: { ...currentTetrimino, y: newY } }));
    checkForCollisions();
  };


  const rotateTetrimino = () => {
    const { currentTetrimino, board } = gameState;
    if (!currentTetrimino) return;
    const newRotation = (currentTetrimino.rotation + 1) % currentTetrimino.rotations;
    const newShape = getRotatedShape(currentTetrimino.shape, newRotation);
    if (isValidPosition(currentTetrimino.x, currentTetrimino.y, newShape)) {
      setGameState((prevState) => ({ ...prevState, currentTetrimino: { ...currentTetrimino, rotation: newRotation, shape: newShape } }));
    }
  };


  const checkForCollisions = () => {
    const { currentTetrimino, board } = gameState;
    if (!currentTetrimino) return;
    const { x, y, shape } = currentTetrimino;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          if (x + j < 0 || x + j >= 10 || y + i < 0 || y + i >= 20) {
            setGameState((prevState) => ({ ...prevState, gameOver: true }));
            return;
          }
          if (board[y + i][x + j] === 1) {
            mergeTetrimino();
            return;
          }
        }
      }
    }
  };


  const mergeTetrimino = () => {
    const { currentTetrimino, board } = gameState;
    if (!currentTetrimino) return;
    const { x, y, shape } = currentTetrimino;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          board[y + i][x + j] = 1;
        }
      }
    }
    setGameState((prevState) => ({ ...prevState, board }));
    checkForLines();
  };
 
  const checkForLines = () => {
    const { board } = gameState;
    let lines = 0;
    for (let i = 0; i < 20; i++) {
      let solid = true;
      for (let j = 0; j < 10; j++) {
        if (board[i][j] === 0) {
          solid = false;
          break;
        }
      }
      if (solid) {
        lines++;
        board.splice(i, 1);
        board.unshift(Array(10).fill(0));
      }
    }
    setGameState((prevState) => ({ ...prevState, lines, score: prevState.score + lines * 100 }));
  };
 
  const getRotatedShape = (shape, rotation) => {
    const rotatedShape = [];
    for (let i = 0; i < shape.length; i++) {
      rotatedShape.push([]);
      for (let j = 0; j < shape[i].length; j++) {
        rotatedShape[i].push(shape[shape.length - 1 - j][i]);
      }
    }
    return rotatedShape;
  };
 
  const isValidPosition = (x, y, shape) => {
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          if (x + j < 0 || x + j >= 10 || y + i < 0 || y + i >= 20) {
            return false;
          }
          if (gameState.board[y + i][x + j] === 1) {
            return false;
          }
        }
      }
    }
    return true;
  };
 
  const handlePowerUp = (powerUp) => {
    switch (powerUp) {
      case 'clearRow':
        clearRow();
        break;
      case 'addPoints':
        addPoints(100);
        break;
      case 'slowDown':
        slowDown();
        break;
      default:
        break;
    }
  };
 
  const clearRow = () => {
    const board = gameState.board;
    for (let i = 0; i < 20; i++) {
      let solid = true;
      for (let j = 0; j < 10; j++) {
        if (board[i][j] === 0) {
          solid = false;
          break;
        }
      }
      if (solid) {
        board.splice(i, 1);
        board.unshift(Array(10).fill(0));
        setGameState((prevState) => ({ ...prevState, board }));
        addPoints(100);
      }
    }
  };
 
  const addPoints = (points) => {
    setGameState((prevState) => ({ ...prevState, score: prevState.score + points }));
  };
 
  const slowDown = () => {
    const currentInterval = gameState.interval;
    const newInterval = currentInterval * 1.5;
    setGameState((prevState) => ({ ...prevState, interval: newInterval }));
    setTimeout(() => {
      setGameState((prevState) => ({ ...prevState, interval: currentInterval }));
    }, 5000); // slow down for 5 seconds
  };


  const handleLevelUp = () => {
    const currentLevel = gameState.level;
    const newLevel = currentLevel + 1;
    const newInterval = gameState.interval * 0.9; // decrease interval by 10%
    setGameState((prevState) => ({ ...prevState, level: newLevel, interval: newInterval }));
    addPoints(1000); // reward player with 1000 points
  };


  const handleGameModeChange = (gameMode) => {
    switch (gameMode) {
      case 'marathon':
        setGameState((prevState) => ({ ...prevState, gameMode, interval: 1000 }));
        break;
      case 'sprint':
        setGameState((prevState) => ({ ...prevState, gameMode, interval: 500 }));
        break;
      case 'ultra':
        setGameState((prevState) => ({ ...prevState, gameMode, interval: 200 }));
        break;
      default:
        break;
    }
  };
   
  return (
    <div className="game-container">
      {gameState.gameOver ? (
        <EndScreen />
      ) : (
        <>
          <GameBoard />
          <Tetrimino />
          <NextTetrimino />
          <GameInfo />
          <PowerUps />
          <LevelingSystem />
          <GameModes />
          <AIOpponent />
        </>
      )}
    </div>
  );
  };
 
  export default Game;
