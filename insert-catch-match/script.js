const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const GAME_DURATION = 30; // seconds

const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn');
const game_container = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const highScoreEl = document.getElementById('high-score');
const message = document.getElementById('message');
const catchSound = document.querySelector('audio[src="catch-sound.mp3"]');
const gameOverSound = document.querySelector('audio[src="game-over-sound.mp3"]');

let seconds = 0;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let selected_insect = {};
let gameInterval = null;

start_btn.addEventListener('click', () => screens[0].classList.add('up'));

choose_insect_btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selected_insect = { src, alt };
        screens[1].classList.add('up');
        setTimeout(createInsect, 1000);
        startGame();
    });
});

function startGame() {
    gameInterval = setInterval(updateGame, 1000);
}

function updateGame() {
    increaseTime();
    createInsect();
}

function increaseTime() {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    timeEl.innerHTML = `Time: ${minutes}:${secondsRemaining.toString().padStart(2, '0')}`;
    if (seconds >= GAME_DURATION) {
        gameOver();
    }
}

function createInsect() {
    const insect = document.createElement('div');
    insect.classList.add('insect');
    const { x, y } = getRandomLocation();
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;
    insect.addEventListener('click', catchInsect);
    game_container.appendChild(insect);
}

function getRandomLocation() {
    const x = Math.random() * (SCREEN_WIDTH - 200) + 100;
    const y = Math.random() * (SCREEN_HEIGHT - 200) + 100;
    return { x, y };
}

function catchInsect() {
    increaseScore();
    this.classList.add('caught');
    catchSound.play();
    setTimeout(() => this.remove(), 2000);
}

function increaseScore() {
    score++;
    scoreEl.innerHTML = `Score: ${score}`;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreEl.innerHTML = `High Score: ${highScore}`;
    }
}

function gameOver() {
    clearInterval(gameInterval);
    message.classList.add('visible');
    gameOverSound.play();
    setTimeout(() => {
        message.classList.remove('visible');
        score = 0;
        scoreEl.innerHTML = `Score: ${score}`;
        seconds = 0;
        timeEl.innerHTML = `Time: 00:00`;
        game_container.innerHTML = '';
    }, 3000);
}