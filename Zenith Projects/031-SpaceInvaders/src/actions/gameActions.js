export const updateGameState = (gameState) => {
  return { type: 'UPDATE_GAME_STATE', payload: gameState };
};

export const updatePlayerPosition = (direction) => {
  return { type: 'UPDATE_PLAYER_POSITION', payload: direction };
};

export const alienCollision = (alien) => {
  return { type: 'ALIEN_COLLISION', payload: alien };
};

export const collectPowerUp = (powerUp) => {
  return { type: 'COLLECT_POWER_UP', payload: powerUp };
};

export const increaseScore = (amount) => {
  return { type: 'INCREASE_SCORE', payload: amount };
};

export const decreaseLives = () => {
  return { type: 'DECREASE_LIVES' };
};

export const increaseLevel = () => {
  return { type: 'INCREASE_LEVEL' };
};