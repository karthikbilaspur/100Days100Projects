let commands = ["touch your nose", "hop on one foot", "clap your hands"];
let currentCommand;
let gameStarted = false;

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 400,
    height: 400,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {}

function create() {
    const simonSaysText = this.add.text(200, 100, '', {
        fontSize: 24,
        fill: '#ffffff'
    });

    const commandsText = this.add.text(200, 200, '', {
        fontSize: 18,
        fill: '#ffffff'
    });

    const startGameButton = this.add.text(200, 300, 'Start Game', {
        fontSize: 18,
        fill: '#ffffff'
    });

    startGameButton.setInteractive();
    startGameButton.on('pointerdown', () => {
        if (!gameStarted) {
            gameStarted = true;
            startGame(simonSaysText, commandsText);
        }
    });
}

function update() {}

function startGame(simonSaysText, commandsText) {
    currentCommand = getRandomCommand();
    simonSaysText.text = "Simon says: " + currentCommand;
    setTimeout(() => {
        commandsText.text = "Do the command!";
        setTimeout(() => {
            checkCommand(simonSaysText, commandsText);
        }, 2000);
    }, 2000);
}

function getRandomCommand() {
    return commands[Math.floor(Math.random() * commands.length)];
}

function checkCommand(simonSaysText, commandsText) {
    const userCommand = prompt("What did you do?");
    if (userCommand.toLowerCase() === currentCommand.toLowerCase()) {
        alert("Correct!");
        startGame(simonSaysText, commandsText);
    } else {
        alert("Wrong! Game over.");
        gameStarted = false;
    }
}