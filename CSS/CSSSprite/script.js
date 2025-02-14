let score = 0;
let character = document.querySelector('.character');
let coins = document.querySelector('.coins');
let obstacles = document.querySelector('.obstacles');
let scoreElement = document.querySelector('.score');

// Move the character
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        character.style.left = `${character.offsetLeft - 10}px`;
    } else if (e.key === 'ArrowRight') {
        character.style.left = `${character.offsetLeft + 10}px`;
    }
});

// Generate coins and obstacles
setInterval(() => {
    let coinX = Math.random() * (window.innerWidth - 20);
    let coinY = Math.random() * (window.innerHeight - 20);
    coins.style.left = `${coinX}px`;
    coins.style.top = `${coinY}px`;

    let obstacleX = Math.random() * (window.innerWidth - 50);
    let obstacleY = Math.random() * (window.innerHeight - 50);
    obstacles.style.left = `${obstacleX}px`;
    obstacles.style.top = `${obstacleY}px`;
}, 2000);

// Check for collisions
setInterval(() => {
    let characterRect = character.getBoundingClientRect();
    let coinRect = coins.getBoundingClientRect();
    let obstacleRect = obstacles.getBoundingClientRect();

    if (characterRect.x < coinRect.x + coinRect.width &&
        characterRect.x + characterRect.width > coinRect.x &&
        characterRect.y < coinRect.y + coinRect.height &&
        characterRect.y + characterRect.height > coinRect.y) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        coins.style.left = `${Math.random() * (window.innerWidth - 20)}px`;
        coins.style.top = `${Math.random() * (window.innerHeight - 20)}px`;
    }

    if (characterRect.x < obstacleRect.x + obstacleRect.width &&
        characterRect.x + characterRect.width > obstacleRect.x &&
        characterRect.y < obstacleRect.y + obstacleRect.height &&
        characterRect.y + characterRect.height > obstacleRect.y) {
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
    }
}, 100);