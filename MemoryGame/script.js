let cards = [];
let flippedCards = [];
let matchedCards = [];
let score = 0;
let timer = 60;

// Create card deck
for (let i = 0; i < 12; i++) {
    cards.push({ id: i, value: Math.floor(i / 2) });
}

// Shuffle card deck
cards = shuffle(cards);

// Create Phaser game instance
const game = new Phaser.Game({
    type: Phaser.CANVAS,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
});

// Preload game assets
function preload() {}

// Create game objects
function create() {
    // Create card sprites
    for (let i = 0; i < cards.length; i++) {
        const card = this.add.sprite(100 + (i % 4) * 150, 100 + Math.floor(i / 4) * 150, 'card');
        card.setData('id', cards[i].id);
        card.setData('value', cards[i].value);
        card.setInteractive();
        card.on('pointerdown', () => {
            if (flippedCards.length < 2 && !card.getData('flipped') && !card.getData('matched')) {
                flipCard(card);
            }
        });
    }

    // Create score text
    const scoreText = this.add.text(10, 10, 'Score: 0', {
        fontSize: 24,
        fill: '#ffffff'
    });

    // Create timer text
    const timerText = this.add.text(10, 50, `Time: ${timer}`, {
        fontSize: 24,
        fill: '#ffffff'
    });

    // Update score and timer texts
    this.time.addEvent({
        delay: 1000,
        callback: () => {
            timer -= 1;
            timerText.text = `Time: ${timer}`;

            if (timer <= 0) {
                alert('Game Over!');
                // Restart game or show game over screen
            }
        },
        loop: true
    });
}

// Update game state
function update(time, delta) {}

// Flip card function
function flipCard(card) {
    card.setScale(1.1);
    card.setData('flipped', true);
    flippedCards.push(card);

    this.tweens.add({
        targets: card,
        scale: 1,
        duration: 200,
        ease: 'Back.out'
    });

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check match function
function checkMatch() {
    if (flippedCards[0].getData('value') === flippedCards[1].getData('value')) {
        flippedCards.forEach(card => {
            card.setTint(0x00ff00); // Green tint for matched cards
            card.setData('matched', true);
            matchedCards.push(card);
        });

        score += 100;
        const scoreText = this.add.text(10, 10, `Score: ${score}`, {
            fontSize: 24,
            fill: '#ffffff'
        });

        flippedCards = [];
    } else {
        setTimeout(() => {
            flippedCards.forEach(card => {
                card.setData('flipped', false);
            });
            flippedCards = [];
        }, 1000);
    }
}

// Shuffle array function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}