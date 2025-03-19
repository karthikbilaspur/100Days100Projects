const GameState = {
    /**
     * The current turn.
     * @type {String}
     */
    turn: 'red',
  
    /**
     * The currently selected piece.
     * @type {Object|null}
     */
    selectedPiece: null,
  
    /**
     * The current state of the game board.
     * @type {Array<Array<String>>}
     */
    board: Array(17).fill(null).map(() => Array(17).fill(null)),
  
    /**
     * Update the turn.
     */
    updateTurn: () => {
      GameState.turn = GameState.turn === 'red' ? 'green' : 'red';
    },
  
    /**
     * Update the selected piece.
     * @param {Object} piece - The piece to select.
     */
    updateSelectedPiece: (piece) => {
      GameState.selectedPiece = piece;
    },
  
    /**
     * Update the board.
     * @param {Array<Array<String>>} board - The new board state.
     */
    updateBoard: (board) => {
      GameState.board = board;
    },
  
    /**
     * Reset the game state.
     */
    reset: () => {
      GameState.turn = 'red';
      GameState.selectedPiece = null;
      GameState.board = Array(17).fill(null).map(() => Array(17).fill(null));
    },
  };
  
  export default GameState;