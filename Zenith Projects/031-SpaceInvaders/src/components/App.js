import React from 'react';
import Game from './components/Game';
import GameOver from './components/GameOver';
import { useSelector } from 'react-redux';

const App = () => {
  const gameOver = useSelector((state) => state.game.lives === 0);

  return (
    <div>
      {gameOver ? <GameOver /> : <Game />}
    </div>
  );
};

export default App;