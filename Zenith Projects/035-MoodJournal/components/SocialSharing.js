import React, { useState } from 'react';

function SocialSharing() {
  const [shareText, setShareText] = useState('');

  const handleShare = () => {
    // Share text on social media platforms
  };

  return (
    <div>
      <h2>Social Sharing</h2>
      <input type="text" value={shareText} onChange={(e) => setShareText(e.target.value)} />
      <button onClick={handleShare}>Share</button>
    </div>
  );
}

export default SocialSharing;