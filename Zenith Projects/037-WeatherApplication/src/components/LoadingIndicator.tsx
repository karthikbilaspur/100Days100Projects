// src/components/LoadingIndicator.tsx

import React from 'react';

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center mb-4">
      <svg
        className="animate-spin h-5 w-5 text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15m0 0a8.003 8.003 0 005.9 0m0 0h6.643"
        />
      </svg>
    </div>
  );
};

export default LoadingIndicator;