let playerScore = 0;
let computerScore = 0;
let gamesPlayed = 0;

const rockBtn = document.getElementById('rock-btn');
const paperBtn = document.getElementById('paper-btn');
const scissorsBtn = document.getElementById('scissors-btn');
const lizardBtn = document.getElementById('lizard-btn');
const spockBtn = document.getElementById('spock-btn');
const resultContainer = document.getElementById('result');
const playerScoreSpan = document.getElementById('player-score');
const computerScoreSpan = document.getElementById('computer-score');
const gamesPlayedSpan = document.getElementById('games-played');
const winPercentageSpan = document.getElementById('win-percentage');
const resetBtn = document.getElementById('reset-btn');

rockBtn.addEventListener('click', () => {
    playGame('rock');
});

paperBtn.addEventListener('click', () => {
    playGame('paper');
});

scissorsBtn.addEventListener('click', () => {
    playGame('scissors');
});

lizardBtn.addEventListener('click', () => {
    playGame('lizard');
});

spockBtn.addEventListener('click', () => {
    playGame('spock');
});

resetBtn.addEventListener('click', () => {
    resetGame();
});

function playGame(playerChoice) {
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    resultContainer.textContent = `Player chose ${playerChoice}, Computer chose ${computerChoice}.`;

    if (playerChoice === computerChoice) {
        resultContainer.textContent += ' It\'s a tie!';
        resultContainer.className = '';
    } else {
        const winConditions = {
            rock: ['scissors', 'lizard'],
            paper: ['rock', 'spock'],
            scissors: ['paper', 'lizard'],
            lizard: ['spock', 'paper'],
            spock: ['scissors', 'rock']
        };

        if (winConditions[playerChoice].includes(computerChoice)) {
            playerScore++;
            playerScoreSpan.textContent = playerScore;
            resultContainer.textContent += ' Player wins this round!';
            resultContainer.className = 'result-win';
        } else {
            computerScore++;
            computerScoreSpan.textContent = computerScore;
            resultContainer.textContent += ' Computer wins this round!';
            resultContainer.className = 'result-lose';
        }
    }

    gamesPlayed++;
    gamesPlayedSpan.textContent = gamesPlayed;
    winPercentageSpan.textContent = `${((playerScore / gamesPlayed) * 100).toFixed(2)}%`;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    gamesPlayed = 0;
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;
    gamesPlayedSpan.textContent = gamesPlayed;
    winPercentageSpan.textContent = '0.00%';
    resultContainer.textContent = '';
    resultContainer.className = '';
}