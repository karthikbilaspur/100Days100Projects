import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommunityForum() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    axios.get('/api/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Community Forum</h2>
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CommunityForum;