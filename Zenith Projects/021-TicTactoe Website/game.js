// Game-related functions
function handleGameModeChange(mode) {
    gameMode = mode;
    resetGame();
    console.log(`Game mode changed to: ${mode}`);
}

function handleBoardSizeChange(size) {
    boardSize = size;
    resetGame();
    console.log(`Board size changed to: ${size}`);
}

function handleGameReset() {
    resetGame();
    console.log('Game reset');
}