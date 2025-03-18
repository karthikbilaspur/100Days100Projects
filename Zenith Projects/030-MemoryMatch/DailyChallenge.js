import React, { useState, useEffect } from 'react';

const DailyChallenge = ({ dailyChallenge, onDailyChallengeUpdate }) => {
const [cards, setCards] = useState([]);
const [matches, setMatches] = useState(0);
const [score, setScore] = useState(0);

useEffect(() => {
const newCards = [];
for (let i = 0; i < 16; i++) {
newCards.push({
image: `image${i + 1}.jpg`,
flipped: false,
});
}
setCards(newCards);
}, []);

const handleCardClick = (index) => {
const newCards = [...cards];
newCards[index].flipped = true;
setCards(newCards);

if (newCards[index].image === newCards[(index + 1) % 16].image) {
setMatches((prevMatches) => prevMatches + 1);
setScore((prevScore) => prevScore + 10);
}
};

return (
<div>
<h2>Daily Challenge</h2>
<p>Score: {score}</p>
<p>Matches: {matches}</p>
<div className="game-board">
{cards.map((card, index) => (
<div
key={index}
className={`card ${card.flipped ? 'flipped' : ''}`}
onClick={() => handleCardClick(index)}
>
<div className="front" />
<div className="back">
<img src={card.image} alt="Card Image" />
</div>
</div>
))}
</div>
<button onClick={() => onDailyChallengeUpdate({ score, matches })}>
Save Progress
</button>
</div>
);
};

export default DailyChallenge;