import React, { useState } from 'react';

const PowerUpManager = ({ powerUps, onPowerUpUpdate }) => {
const [selectedPowerUp, setSelectedPowerUp] = useState(null);

const handlePowerUpSelect = (powerUp) => {
setSelectedPowerUp(powerUp);
};

const handlePowerUpUse = () => {
    if (selectedPowerUp) {
    const newPowerUps = [...powerUps];
    newPowerUps[selectedPowerUp.index].used = true;
    onPowerUpUpdate(newPowerUps);
    }
    };
    
    return (
    <div>
    <h2>Power-Up Manager</h2>
    <ul>
    {powerUps.map((powerUp, index) => (
    <li key={index}>
    {powerUp.name}
    <button onClick={() => handlePowerUpSelect(index)}>Select</button>
    {powerUp.used ? <p>Used</p> : <button onClick={handlePowerUpUse}>Use</button>}
    </li>
    ))}
    </ul>
    </div>
    );
    };
    
    export default PowerUpManager;