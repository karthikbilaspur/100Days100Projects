import React from 'react';

const ThemeToggle = ({ toggleTheme, currentTheme }) => {
  return (
    <button onClick={toggleTheme} className="theme-toggle">
      Switch to {currentTheme === 'light-theme'? 'Dark' : 'Light'} Theme
    </button>
  );
};

export default ThemeToggle;