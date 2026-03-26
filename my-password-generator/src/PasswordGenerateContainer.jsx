import React, { useState, useEffect, useCallback } from 'react';
import PasswordDisplay from './PasswordDisplay';
import PasswordOptions from './PasswordOptions';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import PasswordHistory from './PasswordHistory';
import ThemeToggle from './ThemeToggle';
import './App.css'; // Assuming you have some basic styles here

// --- Character Sets (moved here or into a utility file) ---
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseBase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberBase = '0123456789';
const symbolBase = '!@#$%^&*()_+[]{}|;:,.<>?';
const confusingChars = 'l1IO0';

// --- Utility function for strength calculation (could be in a separate file) ---
const calculateStrength = (pwd, options) => {
  if (!pwd) return 'N/A';
  let score = 0;

  // Length
  if (pwd.length >= 8) score += 1;
  if (pwd.length >= 12) score += 1;
  if (pwd.length >= 16) score += 1;

  // Character types
  if (/[A-Z]/.test(pwd)) score += 1;
  if (/[a-z]/.test(pwd)) score += 1;
  if (/[0-9]/.test(pwd)) score += 1;
  if (/[!@#$%^&*()_+\-=\]{};':"\\|,.<>?]/.test(pwd)) score += 1; // Basic symbol check

  // More complex checks (e.g., no common patterns, no repeated chars - if implemented)
  // Example: Deduct if only one character type was used for very long
  if (options.includeUppercase && options.includeNumbers && options.includeSymbols && pwd.length > 8) score += 1;

  if (score >= 6) return 'Excellent';
  if (score >= 4) return 'Strong';
  if (score >= 2) return 'Medium';
  return 'Weak';
};

const PasswordGenerateContainer = () => {
  // --- State Variables ---
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeConfusingChars, setExcludeConfusingChars] = useState(true);
  const [excludeDuplicates, setExcludeDuplicates] = useState(false);
  const [customSymbols, setCustomSymbols] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('N/A');
  const [passwordHistory, setPasswordHistory] = useState([]);
  const [theme, setTheme] = useState('light'); // Load from localStorage initially later

  // --- Password Generation Logic (now a callback) ---
  const generatePassword = useCallback(() => {
    let currentUppercase = includeUppercase? uppercaseBase : '';
    let currentNumbers = includeNumbers? numberBase : '';
    let currentSymbols = includeSymbols? (customSymbols || symbolBase) : '';

    if (excludeConfusingChars) {
      currentUppercase = currentUppercase.split('').filter(char =>!confusingChars.includes(char)).join('');
      currentNumbers = currentNumbers.split('').filter(char =>!confusingChars.includes(char)).join('');
      currentSymbols = currentSymbols.split('').filter(char =>!confusingChars.includes(char)).join('');
    }

    let availableChars = lowercaseChars + currentUppercase + currentNumbers + currentSymbols;

    if (availableChars.length === 0) {
      setPassword('Cannot generate: No character types selected!');
      setPasswordStrength('N/A');
      return;
    }

    let generated = '';
    let usedCharsInCurrentPwd = new Set();

    for (let i = 0; i < passwordLength; i++) {
      let charPoolForThisPick = availableChars;
      if (excludeDuplicates) {
        const uniqueAvailable = availableChars.split('').filter(char =>!usedCharsInCurrentPwd.has(char));
        if (uniqueAvailable.length === 0) {
          // All unique characters from availableChars have been used.
          // This might happen if passwordLength > availableChars.length
          // Option 1: Break and return what we have (short password)
          // Option 2: Allow duplicates after all unique chars are used once
          // Option 3: Refill charPoolForThisPick with all availableChars (allowing re-use)
          charPoolForThisPick = availableChars; // For now, let's allow re-use
        } else {
          charPoolForThisPick = uniqueAvailable.join('');
        }
      }

      const randomIndex = Math.floor(Math.random() * charPoolForThisPick.length);
      const char = charPoolForThisPick[randomIndex];
      generated += char;
      if (excludeDuplicates &&!availableChars.split('').filter(char =>!usedCharsInCurrentPwd.has(char)).length === 0) {
        usedCharsInCurrentPwd.add(char);
      }
    }

    setPassword(generated);
    setPasswordHistory(prevHistory => {
      const newHistory = [generated,...prevHistory].slice(0, 5); // Keep last 5
      return newHistory;
    });

    const optionsForStrength = { includeUppercase, includeNumbers, includeSymbols }; // Pass relevant options
    setPasswordStrength(calculateStrength(generated, optionsForStrength));

  }, [
    passwordLength, includeUppercase, includeNumbers, includeSymbols,
    excludeConfusingChars, excludeDuplicates, customSymbols
  ]);



  useEffect(() => {
    document.body.className = theme + '-theme';
    localStorage.setItem('theme', theme); // Save theme preference
  }, [theme]);

  // --- Event Handlers ---
  const handleGenerateClick = () => {
    generatePassword();
  };

  const handleClearHistory = () => {
    setPasswordHistory([]);
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light'? 'dark' : 'light'));
  };

  return (
    <div className={`app-container ${theme}-mode`}>
      <header className="app-header">
        <h1>Advanced Password Generator</h1>
        <ThemeToggle currentTheme={theme} onToggleTheme={toggleTheme} />
      </header>

      <main className="main-content">
        <section className="generator-section">
          <PasswordDisplay password={password} />
          <PasswordStrengthIndicator strength={passwordStrength} />
          <button onClick={handleGenerateClick} className="generate-button">
            Generate New Password
          </button>
        </section>

        <section className="options-section">
          <PasswordOptions
            passwordLength={passwordLength} setPasswordLength={setPasswordLength}
            includeUppercase={includeUppercase} setIncludeUppercase={setIncludeUppercase}
            includeNumbers={includeNumbers} setIncludeNumbers={setIncludeNumbers}
            includeSymbols={includeSymbols} setIncludeSymbols={setIncludeSymbols}
            excludeConfusingChars={excludeConfusingChars} setExcludeConfusingChars={setExcludeConfusingChars}
            excludeDuplicates={excludeDuplicates} setExcludeDuplicates={setExcludeDuplicates}
            customSymbols={customSymbols} setCustomSymbols={setCustomSymbols}
          />
        </section>

        <section className="history-section">
          <PasswordHistory
            passwordHistory={passwordHistory}
            onClearHistory={handleClearHistory}
          />
        </section>
      </main>

      {/* Add some basic CSS to your App.css or index.css for the theme, e.g.: */}
      {/*
     .light-theme { background-color: #f0f0f0; color: #333; }
     .dark-theme { background-color: #333; color: #f0f0f0; }
      */}
    </div>
  );
};

export default PasswordGenerateContainer;