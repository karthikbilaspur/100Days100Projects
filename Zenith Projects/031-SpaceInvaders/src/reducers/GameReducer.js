const initialState = {
  player: { x: 0, y: 0 },
  aliens: [],
  powerUps: [],
  score: 0,
  lives: 3,
  level: 1,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_GAME_STATE':
      return { ...state, ...action.payload };
    case 'UPDATE_PLAYER_POSITION':
      return { ...state, player: { ...state.player, x: state.player.x + action.payload.x, y: state.player.y + action.payload.y } };
    case 'ALIEN_COLLISION':
      return { ...state, lives: state.lives - 1 };
    case 'COLLECT_POWER_UP':
      return { ...state, score: state.score + 10, powerUps: state.powerUps.filter((powerUp) => powerUp !== action.payload) };
    case 'INCREASE_SCORE':
      return { ...state, score: state.score + action.payload };
    case 'DECREASE_LIVES':
      return { ...state, lives: state.lives - 1 };
    case 'INCREASE_LEVEL':
      return { ...state, level: state.level + 1 };
    default:
      return state;
  }
};

export default gameReducer;