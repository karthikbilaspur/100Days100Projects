// src/components/SearchBar.tsx

import React, { useState } from 'react';

interface Props {
  onSearch: (city: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [city, setCity] = useState('');

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(city);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mb-4">
      <input
        type="text"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Search for a city"
        className="w-full p-2 mb-4 border border-gray-400"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;