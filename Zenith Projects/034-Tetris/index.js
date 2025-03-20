import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import GameProvider from './GameContext';


ReactDOM.render(
  <GameProvider>
    <Game />
  </GameProvider>,
  document.getElementById('root')
);
