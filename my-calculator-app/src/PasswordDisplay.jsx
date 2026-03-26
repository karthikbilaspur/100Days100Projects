import React, { useState } from 'react';

// Props: password (string), onCopy (function)
const PasswordDisplay = ({ password }) => {
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true); // New: for masking

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  const toggleShowPassword = () => { // New: toggle masking
    setShowPassword(!showPassword);
  };

  return (
    <div className="password-display">
      <span className="generated-password">
        {showPassword? password : '********'} {/* Apply masking */}
      </span>
      <button onClick={handleCopy} disabled={!password}>
        {copied? 'Copied!' : 'Copy'}
      </button>
      {/* New: Toggle button for masking */}
      <button onClick={toggleShowPassword} className="mask-toggle-button">
        {showPassword? 'Hide' : 'Show'}
      </button>
    </div>
  );
};

export default PasswordDisplay;