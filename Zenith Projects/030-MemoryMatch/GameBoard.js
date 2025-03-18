import React from 'react';
import Card from './Card';

const GameBoard = ({ cards, onCardClick }) => {
return (
<div className="game-board">
{cards.map((card, index) => (
<Card
key={index}
image={card.image}
flipped={card.flipped}
onClick={() => onCardClick(index)}
/>
))}
</div>
);
};

export default GameBoard;