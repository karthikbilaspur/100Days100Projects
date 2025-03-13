let word = 'hangman';
let guessedLetters = [];
let tries = 6;
let score = 0;
let aiGuesses = [];
let multiplayerMode = false;
let leaderboard = [];

document.getElementById('word').innerHTML = '_ '.repeat(word.length);

document.getElementById('submit-guess').addEventListener('click', () => {
    let guess = document.getElementById('guess').value.toLowerCase();

    if (guess.length !== 1) {
        alert('Please enter a single letter.');
        return;
    }

    if (guessedLetters.includes(guess)) {
        alert('You already guessed this letter.');
        return;
    }

    guessedLetters.push(guess);

    if (word.includes(guess)) {
        let wordArray = word.split('');
        let displayWord = '';

        for (let i = 0; i < wordArray.length; i++) {
            if (wordArray[i] === guess) {
                displayWord += guess + ' ';
            } else if (guessedLetters.includes(wordArray[i])) {
                displayWord += wordArray[i] + ' ';
            } else {
                displayWord += '_ ';
            }
        }

        document.getElementById('word').innerHTML = displayWord;

        if (!displayWord.includes('_')) {
            score++;
            document.getElementById('score').innerHTML = `Score: ${score}`;
            alert('Congratulations! You guessed the word.');
            document.getElementById('submit-guess').disabled = true;
        }
    } else {
        tries--;
        document.getElementById('tries').innerHTML = `Tries left: ${tries}`;

        if (tries === 5) {
            document.getElementById('hangman').innerHTML += '<div class="head"></div>';
        } else if (tries === 4) {
            document.getElementById('hangman').innerHTML += '<div class="body"></div>';
        } else if (tries === 3) {
            document.getElementById('hangman').innerHTML += '<div class="arm"></div>';
        } else if (tries === 2) {
            document.getElementById('hangman').innerHTML += '<div class="arm2"></div>';
        } else if (tries === 1) {
            document.getElementById('hangman').innerHTML += '<div class="leg"></div>';
        } else {
            document.getElementById('hangman').innerHTML += '<div class="leg2"></div>';
            alert('Game over! The word was ' + word + '.');
            document.getElementById('submit-guess').disabled = true;
        }
    }

    document.getElementById('guess').value = '';
});

document.getElementById('ai-guess').addEventListener('click', () => {
    let aiGuess = getAiGuess(word, guessedLetters);
    aiGuesses.push(aiGuess);

    if (word.includes(aiGuess)) {
        let wordArray = word.split('');
        let displayWord = '';

        for (let i = 0; i < wordArray.length; i++) {
            if (wordArray[i] === aiGuess) {
                displayWord += aiGuess + ' ';
            } else if (guessedLetters.includes(wordArray[i])) {
                displayWord += wordArray[i] + ' ';
            } else {
                displayWord += '_ ';
            }
        }

        document.getElementById('word').innerHTML = displayWord;

        if (!displayWord.includes('_')) {
            score++;
            document.getElementById('score').innerHTML = `Score: ${score}`;
            alert('Congratulations! The AI guessed the word.');
            document.getElementById('ai-guess').disabled = true;
        }
    } else {
        tries--;
        document.getElementById('tries').innerHTML = `Tries left: ${tries}`;

        if (tries === 5) {
            document.getElementById('hangman').innerHTML += '<div class="head"></div>';
        } else if (tries === 4) {
            document.getElementById('hangman').innerHTML += '<div class="body"></div>';
        } else if (tries === 3) {
            document.getElementById('hangman').innerHTML += '<div class="arm"></div>';
        } else if (tries === 2) {
            document.getElementById('hangman').innerHTML += '<div class="arm2"></div>';
        } else if (tries === 1) {
            document.getElementById('hangman').innerHTML += '<div class="leg"></div>';
        } else {
            document.getElementById('hangman').innerHTML += '<div class="leg2"></div>';
            alert('Game over! The word was ' + word + '.');
            document.getElementById('ai-guess').disabled = true;
        }
    }
});

document.getElementById('multiplayer').addEventListener('click', () => {
    multiplayerMode = true;
    alert('Multiplayer mode activated!');
});

document.getElementById('leaderboard').addEventListener('click', () => {
    leaderboard.push({ name: 'Player 1', score: score });
    alert('Leaderboard updated!');
});

function getAiGuess(word, guessedLetters) {
    let possibleGuesses = [];

    for (let i = 0; i < word.length; i++) {
        if (!guessedLetters.includes(word[i])) {
            possibleGuesses.push(word[i]);
        }
    }

    return possibleGuesses[Math.floor(Math.random() * possibleGuesses.length)];
}

// Animate the hangman figure
anime({
    targets: '#hangman',
    opacity: 1,
    scale: 1,
    easing: 'easeInOutQuad',
    duration: 2000,
});

// Animate the word
anime({
    targets: '#word',
    opacity: 1,
    scale: 1,
    easing: 'easeInOutQuad',
    duration: 2000,
});

// Add event listeners for keyboard input
document.addEventListener('keydown', (event) => {
    if (event.key.length === 1) {
        document.getElementById('guess').value = event.key;
        document.getElementById('submit-guess').click();
    }
});

// Add event listener for screen reader support
document.getElementById('word').addEventListener('change', () => {
    // Screen reader announcement
    alert('Word updated!');
});