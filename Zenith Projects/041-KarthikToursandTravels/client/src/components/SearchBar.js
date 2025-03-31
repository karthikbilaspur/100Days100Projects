import React, { useState } from 'react';


const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);


  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      setError('Please enter a valid search query');
      return;
    }
    // Call the search API here
  };


  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search for cities..."
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Search</button>
    </form>
  );
};


export default SearchBar;