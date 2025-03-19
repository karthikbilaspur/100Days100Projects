import React from 'react';
import ReactDOM from 'react-dom';
import GameBoard from './GameBoard';
import { FacebookShareButton, TwitterShareButton, LinkedInShareButton } from 'react-share';

ReactDOM.render(
  <React.StrictMode>
    <GameBoard />
  </React.StrictMode>,
  document.getElementById('root')
);