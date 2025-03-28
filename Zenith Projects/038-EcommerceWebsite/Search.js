// Search.js
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();
  const { data, error, isLoading, isError } = useQuery(
    ['products', searchQuery],
    async () => {
      if (!searchQuery) return [];
      const response = await fetch(`https://example.com/products?search=${searchQuery}`);
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    },
    {
      enabled: Boolean(searchQuery),
      staleTime: 10000, // 10 seconds
    }
  );

  const handleSearch = (e) => {
    e.preventDefault();
    queryClient.invalidateQueries('products');
  };

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <label>
          Search:
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </label>
        <button type="submit">Search</button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p style={{ color: 'red' }}>{error.message}</p>
      ) : (
        <ul>
          {data.map((product) => (
            <li key={product.id}>
              <p>{product.name}</p>
              <p>Price: {product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;