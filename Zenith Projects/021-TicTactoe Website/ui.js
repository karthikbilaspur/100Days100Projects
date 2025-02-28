// User interface-related functions
function updatePlayerTurnDisplay(player) {
    playerTurnElement.textContent = `Player ${player}'s turn`;
}

function updateGameResultDisplay(result) {
    gameResultElement.textContent = result;
}

function updateLeaderboardDisplay(leaderboard) {
    leaderboardList.innerHTML = '';

    leaderboard.forEach((player) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${player.name} - ${player.wins} wins`;
        leaderboardList.appendChild(listItem);
    });
}