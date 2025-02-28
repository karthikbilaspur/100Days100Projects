// Online-related functions
function handleOnlineGameInvite(invite) {
    const gameId = invite.gameId;
    const opponentName = invite.opponentName;

    // Display game invite notification
    const notificationElement = document.createElement('div');
    notificationElement.textContent = `Game invite from ${opponentName}!`;
    notificationElement.classList.add('notification');
    document.body.appendChild(notificationElement);

    // Add accept and decline buttons
    const acceptButton = document.createElement('button');
    acceptButton.textContent = 'Accept';
    acceptButton.addEventListener('click', () => {
        acceptGameInvite(gameId);
    });

    const declineButton = document.createElement('button');
    declineButton.textContent = 'Decline';
    declineButton.addEventListener('click', () => {
        declineGameInvite(gameId);
    });

    notificationElement.appendChild(acceptButton);
    notificationElement.appendChild(declineButton);
}

function handleOnlineGameJoin(join) {
    const gameId = join.gameId;
    const opponentName = join.opponentName;

    // Update game board to reflect online game
    gameBoardElement.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${i * boardSize + j}`;
            row.appendChild(cell);
        }
        gameBoardElement.appendChild(row);
    }

    // Update player turn display
    playerTurnElement.textContent = `Player ${currentPlayer}'s turn`;

    // Start online game
    startOnlineGame(gameId, opponentName);
}

function handleOnlineGameLeave(leave) {
    const gameId = leave.gameId;

    // Update game board to reflect offline game
    gameBoardElement.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `cell-${i * boardSize + j}`;
            row.appendChild(cell);
        }
        gameBoardElement.appendChild(row);
    }

    // Update player turn display
    playerTurnElement.textContent = `Player ${currentPlayer}'s turn`;

    // End online game
    endOnlineGame(gameId);
}

function acceptGameInvite(gameId) {
    // TO DO: implement accept game invite logic
    console.log(`Game invite accepted: ${gameId}`);
}

function declineGameInvite(gameId) {
    // TO DO: implement decline game invite logic
    console.log(`Game invite declined: ${gameId}`);
}

function startOnlineGame(gameId, opponentName) {
    // TO DO: implement start online game logic
    console.log(`Online game started: ${gameId} with ${opponentName}`);
}

function endOnlineGame(gameId) {
    // TO DO: implement end online game logic
    console.log(`Online game ended: ${gameId}`);
}