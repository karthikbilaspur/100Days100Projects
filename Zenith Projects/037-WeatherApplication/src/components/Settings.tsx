// src/components/Settings.tsx

import React, { useState } from 'react';

interface Props {
  settings: any;
  onSettingsChange: (settings: any) => void;
}

const Settings = ({ settings, onSettingsChange }: Props) => {
  const [unit, setUnit] = useState(settings.unit);

  const handleSettingsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUnit = event.target.value;
    setUnit(selectedUnit);
    onSettingsChange({ unit: selectedUnit });
  };

  return (
    <div>
      <h2>Settings</h2>
      <select value={unit} onChange={handleSettingsChange}>
        <option value="metric">Metric (Celsius)</option>
        <option value="imperial">Imperial (Fahrenheit)</option>
      </select>
    </div>
  );
};

export default Settings;