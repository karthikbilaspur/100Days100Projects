import React from 'react';

// Props: All the state setters and values from the parent (e.g., setPasswordLength, passwordLength)
const PasswordOptions = ({
  passwordLength,
  setPasswordLength,
  includeUppercase,
  setIncludeUppercase,
  includeNumbers,
  setIncludeNumbers,
  includeSymbols,
  setIncludeSymbols,
  excludeConfusingChars,
  setExcludeConfusingChars,
  excludeDuplicates,
  setExcludeDuplicates,
  customSymbols,
  setCustomSymbols,
}) => {
  return (
    <div className="password-options">
      <h2>Options</h2>
      <div className="option-group">
        <label>
          Length: {passwordLength}
          <input
            type="range"
            min="6" // Example: Min length
            max="30" // Example: Max length
            value={passwordLength}
            onChange={(e) => setPasswordLength(Number(e.target.value))}
            className="length-slider"
          />
          <span className="length-hint"> (Min: 6, Max: 30)</span> {/* New: Min/Max hints */}
        </label>
      </div>

      <div className="option-group checkbox-group">
        <label>
          <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
          Include Uppercase (A-Z)
        </label>
        <label>
          <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
          Include Numbers (0-9)
        </label>
        <label>
          <input type="checkbox" checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} />
          Include Symbols (!@#$...)
        </label>
        <label>
          <input type="checkbox" checked={excludeConfusingChars} onChange={(e) => setExcludeConfusingChars(e.target.checked)} />
          Exclude Confusing Chars (l, 1, I, O, 0)
        </label>
        <label>
          <input type="checkbox" checked={excludeDuplicates} onChange={(e) => setExcludeDuplicates(e.target.checked)} />
          Exclude Duplicate Chars
        </label>
      </div>

      <div className="option-group">
        <label>
          Custom Symbols:
          <input
            type="text"
            value={customSymbols}
            onChange={(e) => setCustomSymbols(e.target.value)}
            placeholder="e.g.,!@#$"
            disabled={!includeSymbols} // New: disable if symbols not included
            className="custom-symbols-input"
          />
          {!includeSymbols && <span className="hint-text"> (Enable "Include Symbols" to use custom symbols)</span>} {/* New: Hint */}
        </label>
      </div>
    </div>
  );
};

export default PasswordOptions;