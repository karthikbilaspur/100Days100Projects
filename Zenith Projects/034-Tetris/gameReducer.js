// Game reducer (handles state updates)
const gameReducer = (state, action) => {
    switch (action.type) {
      case 'UPDATE_BOARD':
        return { ...state, board: action.payload };
      case 'UPDATE_TETRIMINO':
        return { ...state, currentTetrimino: action.payload };
      case 'UPDATE_NEXT_TETRIMINO':
        return { ...state, nextTetrimino: action.payload };
      case 'UPDATE_SCORE':
        return { ...state, score: action.payload };
      case 'UPDATE_LINES':
        return { ...state, lines: action.payload };
      case 'UPDATE_LEVEL':
        return { ...state, level: action.payload };
      default:
        return state;
    }
  };
  
  export default gameReducer;