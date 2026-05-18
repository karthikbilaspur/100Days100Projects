import React, { useState, useEffect } from 'react';
import QuizAppContainer from './components/QuizAppContainer';

function App() {
  const [theme, setTheme] = useState('light-theme'); // Default theme

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTheme(savedTheme);
     
    }
  }, []);

  // Apply theme class to body and save to localStorage when theme changes
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light-theme'? 'dark-theme' : 'light-theme'));
  };

  return (
    <div className="app-main-wrapper"> {/* Wrapper for potential multiple apps/global layout */}
      {/* <ThemeToggle theme={theme} toggleTheme={toggleTheme} /> */}
      {/* We can integrate the ThemeToggle into the QuizAppContainer's header for now */}
      <QuizAppContainer toggleTheme={toggleTheme} currentTheme={theme} />
      {/* If you add PasswordGeneratorContainer, you might want to switch between them */}
      {/* <PasswordGeneratorContainer toggleTheme={toggleTheme} currentTheme={theme} /> */}
    </div>
  );
}

export default App;