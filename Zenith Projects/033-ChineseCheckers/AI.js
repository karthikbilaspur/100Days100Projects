const AI = {
    makeMove: (board, turn) => {
      // Simple AI that makes a random valid jump move
      const availableJumpMoves = GameLogic.getAvailableJumpMoves(board, turn);
      if (availableJumpMoves.length > 0) {
        const randomJumpMove = availableJumpMoves[Math.floor(Math.random() * availableJumpMoves.length)];
        return { from: { i: randomJumpMove.i - (randomJumpMove.i - (randomJumpMove.i - 2)) / 2, j: randomJumpMove.j - (randomJumpMove.j - (randomJumpMove.j - 2)) / 2 }, to: randomJumpMove };
      } else {
        // Simple AI that makes a random valid move
        const availableMoves = GameLogic.getAvailableMoves(board, turn);
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        return { from: { i: randomMove.i - (randomMove.i - (randomMove.i - 1)) / 2, j: randomMove.j - (randomMove.j - (randomMove.j - 1)) / 2 }, to: randomMove };
      }
    },
  };