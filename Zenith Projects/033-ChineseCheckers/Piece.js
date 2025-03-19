import React from 'react';

const Piece = ({ piece, onClick, highlighted }) => {
  return (
    <div className={`piece ${piece} ${highlighted ? 'highlighted' : ''}`} onClick={onClick} />
  );
};

export default Piece;