import React, { useState } from 'react';

const VoiceInput = () => {
  const [voiceInput, setVoiceInput] = useState('');

  const handleVoiceInput = (event) => {
    setVoiceInput(event.target.value);
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(voiceInput);
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <h2>Voice Input</h2>
      <input type="text" value={voiceInput} onChange={handleVoiceInput} />
      <button onClick={handleSpeak}>Speak</button>
    </div>
  );
};

export default VoiceInput;