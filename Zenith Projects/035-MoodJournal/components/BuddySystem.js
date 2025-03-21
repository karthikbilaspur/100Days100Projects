import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BuddySystem() {
  const [buddy, setBuddy] = useState(null);

  useEffect(() => {
    axios.get('/api/buddy')
      .then((response) => {
        setBuddy(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Buddy System</h2>
      {buddy && (
        <div>
          <h3>Buddy Name: {buddy.name}</h3>
          <p>Buddy Bio: {buddy.bio}</p>
        </div>
      )}
    </div>
  );
}

export default BuddySystem;