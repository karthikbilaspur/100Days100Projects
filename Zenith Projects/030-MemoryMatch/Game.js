import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import DifficultySelect from './DifficultySelect';
import ThemeSelect from './ThemeSelect';
import ProfileManager from './ProfileManager';
import Leaderboard from './Leaderboard';
import DailyChallenge from './DailyChallenge';
import PowerUpManager from './PowerUpManager';
import getGridSize from './utils/getGridSize';
import getMatchCount from './utils/getMatchCount';
import shuffleArray from './utils/shuffleArray';

const Game = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matches, setMatches] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [difficulty, setDifficulty] = useState('easy');
  const [theme, setTheme] = useState('default');
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0);
  const [profile, setProfile] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [dailyChallenge, setDailyChallenge] = useState({});
  const [powerUps, setPowerUps] = useState({});

  useEffect(() => {
    const images = [
      'image1.jpg',
      'image2.jpg',
      'image3.jpg',
      'image4.jpg',
      'image5.jpg',
      'image6.jpg',
      'image7.jpg',
      'image8.jpg',
    ];

    const gridSize = getGridSize(difficulty);
    const matchCount = getMatchCount(difficulty);
    const shuffledCards = shuffleArray(images);

    const newCards = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
      newCards.push({
        image: shuffledCards[i % 8],
        flipped: false,
      });
    }

    setCards(newCards);
  }, [difficulty]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      setGameOver(true);
    }
  }, [timer]);

  useEffect(() => {
    if (matches >= getMatchCount(difficulty)) {
      setGameOver(true);
    }
  }, [matches]);

  const handleCardClick = (index) => {
    if (selectedCards.length < 2) {
      const newSelectedCards = [...selectedCards, index];
      setSelectedCards(newSelectedCards);

      const newCards = [...cards];
      newCards[index].flipped = true;
      setCards(newCards);

      if (newSelectedCards.length === 2) {
        const card1 = newCards[newSelectedCards[0]];
        const card2 = newCards[newSelectedCards[1]];

        if (card1.image === card2.image) {
          setMatches((prevMatches) => prevMatches + 1);
          setScore((prevScore) => prevScore + 10);
        } else {
          setTimeout(() => {
            const newCards = [...cards];
            newCards[newSelectedCards[0]].flipped = false;
            newCards[newSelectedCards[1]].flipped = false;
            setCards(newCards);
            setSelectedCards([]);
          }, 1000);
        }
      }
    }
  };

  const handleDifficultySelect = (difficulty) => {
    setDifficulty(difficulty);
  };

  const handleThemeSelect = (theme) => {
    setTheme(theme);
  };

  const handleProfileSave = (profile) => {
    setProfile(profile);
    localStorage.setItem('profile', JSON.stringify(profile));
  };

  const handleLeaderboardUpdate = (leaderboard) => {
    setLeaderboard(leaderboard);
  };

  const handleDailyChallengeUpdate = (dailyChallenge) => {
    setDailyChallenge(dailyChallenge);
  };

  const handlePowerUpUpdate = (powerUps) => {
    setPowerUps(powerUps);
  };

  const handleRestart = () => {
    setCards([]);
    setSelectedCards([]);
    setMatches(0);
    setScore(0);
    setTimer(60);
    setGameOver(false);
  };

  return (
    <div className="game">
      {gameOver ? (
        <div>
          <h2>Game Over!</h2>
          <p>
            You {matches >= getMatchCount(difficulty) ? 'won' : 'lost'}!
          </p>
          <p>Score: {score}</p>
          <p>High Score: {highScore}</p>
          <Leaderboard leaderboard={leaderboard} />
<button onClick={handleRestart}>Restart</button>
</div>
) : (
<div>
<ProfileManager
profile={profile}
onProfileSave={handleProfileSave}
/>
<DifficultySelect
difficulty={difficulty}
onDifficultySelect={handleDifficultySelect}
/>
<ThemeSelect
theme={theme}
onThemeSelect={handleThemeSelect}
/>
<GameBoard
cards={cards}
onCardClick={handleCardClick}
/>
<p>Score: {score}</p>
<p>Time: {timer}</p>
<DailyChallenge
dailyChallenge={dailyChallenge}
onDailyChallengeUpdate={handleDailyChallengeUpdate}
/>
<PowerUpManager
powerUps={powerUps}
onPowerUpUpdate={handlePowerUpUpdate}
/>
</div>
)}
</div>
);
};

export default Game;