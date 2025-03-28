// src/components/SocialSharing.tsx

import React from 'react';

const SocialSharing = () => {
  const handleShare = (platform: string) => {
    const url = 'https://your-weather-app.com';
    const text = 'Check out the weather forecast!';

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share?url=${url}&title=${text}`, '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={() => handleShare('twitter')}
      >
        Twitter
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={() => handleShare('facebook')}
      >
        Facebook
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleShare('linkedin')}
      >
        LinkedIn
      </button>
    </div>
  );
};

export default SocialSharing;