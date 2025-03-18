import React, { useState, useEffect } from 'react';
import Player from './Player';
import Alien from './Alien';
import PowerUp from './PowerUp';
import Menu from './Menu';
import { gameActions } from '../actions/gameActions';
import { useSelector, useDispatch } from 'react-redux';
import './Game.css';

const Game = () => {
  const dispatch = useDispatch();
  const gameState = useSelector((state) => state.game);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(gameActions.updateGameState(gameState));
    }, 16);
    return () => clearInterval(intervalId);
  }, [gameState]);

  const handlePlayerMovement = (direction) => {
    dispatch(gameActions.updatePlayerPosition(direction));
  };

  const handleAlienCollision = (alien) => {
    dispatch(gameActions.alienCollision(alien));
  };

  const handlePowerUpCollection = (powerUp) => {
    dispatch(gameActions.collectPowerUp(powerUp));
  };

  const handleStartGame = () => {
    setShowMenu(false);
  };

  return (
    <div className="game-container">
      {showMenu && <Menu onStartGame={handleStartGame} />}
      {!showMenu && (
        <div>
          {gameState.aliens.map((alien, index) => (
            <Alien key={index} x={alien.x} y={alien.y} onCollision={handleAlienCollision} />
          ))}
          <Player
            x={gameState.player.x}
            y={gameState.player.y}
            onMovement={handlePlayerMovement}
          />
          {gameState.powerUps.map((powerUp, index) => (
            <PowerUp key={index} x={powerUp.x} y={powerUp.y} onCollection={handlePowerUpCollection} />
          ))}
          <div className="score-container">
            <div>Score: {gameState.score}</div>
            <div>Lives: {gameState.lives}</div>
            <div>Level: {gameState.level}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;