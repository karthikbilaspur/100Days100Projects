const GameLogic = {
    /**
     * Check if a move is valid.
     * 
     * @param {Object} from - The starting position of the piece.
     * @param {Object} to - The destination position of the piece.
     * @param {Array<Array<String>>} board - The current state of the game board.
     * @returns {Boolean} True if the move is valid, false otherwise.
     */
    isValidMove: (from, to, board) => {
      // Check if the move is diagonal
      if (Math.abs(to.i - from.i) !== Math.abs(to.j - from.j)) {
        return false;
      }
  
      // Check if the move is simple (one square)
      if (Math.abs(to.i - from.i) === 1) {
        // Check if the destination square is empty
        if (board[to.i][to.j] !== null) {
          return false;
        }
        return true;
      }
  
      // Check if the move is a jump (two squares)
      if (Math.abs(to.i - from.i) === 2) {
        // Calculate the position of the square that needs to be jumped
        const jumpI = (from.i + to.i) / 2;
        const jumpJ = (from.j + to.j) / 2;
  
        // Check if the square that needs to be jumped is occupied by an opponent's piece
        if (board[jumpI][jumpJ] === null || board[jumpI][jumpJ] === from.piece) {
          return false;
        }
  
        // Check if the destination square is empty
        if (board[to.i][to.j] !== null) {
          return false;
        }
        return true;
      }
  
      return false;
    },
  
    /**
     * Get available moves for a piece.
     * 
     * @param {Array<Array<String>>} board - The current state of the game board.
     * @param {String} turn - The current turn.
     * @returns {Array<Object>} An array of available moves.
     */
    getAvailableMoves: (board, turn) => {
      const availableMoves = [];
  
      // Check all pieces on the board
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === turn) {
            // Check simple moves (one square)
            for (let k = -1; k <= 1; k++) {
              for (let l = -1; l <= 1; l++) {
                if (k === 0 && l === 0) {
                  continue;
                }
  
                const to = { i: i + k, j: j + l };
                if (GameLogic.isValidMove({ i, j, piece: turn }, to, board)) {
                  availableMoves.push(to);
                }
              }
            }
  
            // Check jump moves (two squares)
            for (let k = -2; k <= 2; k++) {
              for (let l = -2; l <= 2; l++) {
                if (k === 0 && l === 0) {
                  continue;
                }
  
                const to = { i: i + k, j: j + l };
                if (GameLogic.isValidMove({ i, j, piece: turn }, to, board)) {
                  availableMoves.push(to);
                }
              }
            }
          }
        }
      }
  
      return availableMoves;
    },
  
    /**
     * Check if the game is won.
     * 
     * @param {Array<Array<String>>} board - The current state of the game board.
     * @param {String} turn - The current turn.
     * @returns {Boolean} True if the game is won, false otherwise.
     */
    checkWinCondition: (board, turn) => {
      // Check if all opponent's pieces are blocked
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === (turn === 'red' ? 'green' : 'red')) {
            const availableMoves = GameLogic.getAvailableMoves(board, board[i][j]);
            if (availableMoves.length > 0) {
              return false;
            }
          }
        }
      }
  
      return true;
    },
  /**
   * Check if the game is a draw.
   *
   * @param {Array<Array<String>>} board - The current state of the game board.
   * @returns {Boolean} True if the game is a draw, false otherwise.
   */
  isDraw: (board) => {
    // Check if all pieces are blocked
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] !== null) {
          const availableMoves = GameLogic.getAvailableMoves(board, board[i][j]);
          if (availableMoves.length > 0) {
            return false;
          }
        }
      }
    }

    return true;
  }
};

/**
   * Get available moves for a piece, considering jump moves.
   *
   * @param {Array<Array<String>>} board - The current state of the game board.
   * @param {String} turn - The current turn.
   * @returns {Array<Object>} An array of available moves.
   */
(board, turn) => {
    const availableMoves = [];

    // Helper function to recursively find all jump moves
    const findJumpMoves = (from, visited) => {
        let foundMoves = [];
        const directions = [
            { di: -2, dj: -2 }, { di: -2, dj: 2 },
            { di: 2, dj: -2 }, { di: 2, dj: 2 }
        ];

        for (const { di, dj } of directions) {
            const to = { i: from.i + di, j: from.j + dj };
            if (
                to.i >= 0 && to.i < board.length &&
                to.j >= 0 && to.j < board[0].length &&
                !visited.some(v => v.i === to.i && v.j === to.j) &&
                GameLogic.isValidJumpMove(from, to, board)
            ) {
                foundMoves.push(to);
                visited.push(to);
                foundMoves = foundMoves.concat(findJumpMoves(to, visited));
            }
        }

        return foundMoves;
    };

    // Check all pieces on the board
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === turn) {
                const from = { i, j };
                const visited = [];
                const jumpMoves = findJumpMoves(from, visited);
                availableMoves.push(...jumpMoves);
            }
        }
    }

    return availableMoves;
},

/**
 * Check if a jump move is valid.
 *
 * @param {Object} from - The starting position of the piece.
 * @param {Object} to - The destination position of the piece.
 * @param {Array<Array<String>>} board - The current state of the game board.
 * @returns {Boolean} True if the jump move is valid, false otherwise.
 */
isValidJumpMove: (from, to, board) => {
    // Check if the move is diagonal
    if (Math.abs(to.i - from.i) !== 2 || Math.abs(to.j - from.j) !== 2) {
        return false;
    }

    // Calculate the position of the square that needs to be jumped
    const jumpI = (from.i + to.i) / 2;
    const jumpJ = (from.j + to.j) / 2;

    // Check if the square that needs to be jumped is occupied by an opponent's piece
    if (board[jumpI][jumpJ] === null || board[jumpI][jumpJ] === from.piece) {
        return false;
    }

    // Check if the destination square is empty
    if (board[to.i][to.j] !== null) {
        return false;
    }

    return true;
}

  
  export default GameLogic;