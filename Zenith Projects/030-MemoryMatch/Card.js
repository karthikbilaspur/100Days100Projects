import React from 'react';

const Card = ({ image, flipped, onClick }) => {
return (
<div
className={`card ${flipped ? 'flipped' : ''}`}
onClick={onClick}
>
<div className="front" />
<div className="back">
<img src={image} alt="Card Image" />
</div>
</div>
);
};

export default Card;