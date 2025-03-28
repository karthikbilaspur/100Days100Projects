// src/components/Favorites.tsx

import React from 'react';

interface Props {
  favorites: string[];
  onFavorite: (city: string) => void;
}

const Favorites = ({ favorites, onFavorite }: Props) => {
  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={index}>
            {favorite}
            <button onClick={() => onFavorite(favorite)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;