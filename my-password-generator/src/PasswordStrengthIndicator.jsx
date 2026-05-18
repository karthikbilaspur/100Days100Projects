import React from 'react';

// Props: strength (string like 'Weak', 'Medium', 'Strong')
const PasswordStrengthIndicator = ({ strength }) => {
  const getStrengthClass = () => {
    switch (strength) {
      case 'Weak': return 'strength-weak';
      case 'Medium': return 'strength-medium';
      case 'Strong': return 'strength-strong';
      case 'Excellent': return 'strength-excellent'; // Could add another level
      default: return '';
    }
  };

  const getStrengthProgress = () => { // New: for progress bar
    switch (strength) {
      case 'Weak': return '25%';
      case 'Medium': return '50%';
      case 'Strong': return '75%';
      case 'Excellent': return '100%';
      default: return '0%';
    }
  };

  const getTooltipText = () => { // New: for detailed feedback
    switch (strength) {
      case 'Weak': return 'Password is too short or lacks diverse characters.';
      case 'Medium': return 'Password is decent, consider adding more types of characters.';
      case 'Strong': return 'Great password! Very secure.';
      case 'Excellent': return 'Exceptional password strength!';
      default: return 'Adjust options to see strength.';
    }
  };

  return (
    <div className={`password-strength-indicator ${getStrengthClass()}`}>
      <div className="strength-bar-container"> {/* New: Progress bar container */}
        <div className="strength-bar" style={{ width: getStrengthProgress() }}></div>
      </div>
      <p className="strength-text" title={getTooltipText()}> {/* New: Tooltip */}
        Strength: <strong>{strength}</strong>
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;