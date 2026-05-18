import React from 'react';

// Props: passwordHistory (array of strings), onClearHistory (function)
const PasswordHistory = ({ passwordHistory, onClearHistory }) => {
  const handleCopy = (pwd) => {
    navigator.clipboard.writeText(pwd);
    // Add temporary visual feedback if desired
  };

  if (passwordHistory.length === 0) {
    return null; // Don't render if no history
  }

  return (
    <div className="password-history-container">
      <h2>Recent Passwords</h2>
      <button onClick={onClearHistory} className="clear-history-button">
        Clear History
      </button>
      <ul className="history-list">
        {passwordHistory.map((pwd, index) => (
          <li key={index} className={index % 2 === 0? 'even-item' : 'odd-item'}> {/* New: Visual distinction */}
            <span className="history-password">{pwd}</span>
            <button onClick={() => handleCopy(pwd)} className="copy-history-button">
              Copy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordHistory;