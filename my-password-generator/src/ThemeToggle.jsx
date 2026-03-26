import React from 'react';

// Props: currentTheme (string), onToggleTheme (function)
const ThemeToggle = ({ currentTheme, onToggleTheme }) => {
  const isLight = currentTheme === 'light';
  const icon = isLight? '☀️' : '🌙'; // New: Icon change
  const label = isLight? 'Switch to Dark Mode' : 'Switch to Light Mode'; // New: Accessibility label

  return (
    <button onClick={onToggleTheme} className="theme-toggle" aria-label={label}>
      {icon} {isLight? 'Dark Mode' : 'Light Mode'}
    </button>
  );
};

export default ThemeToggle;