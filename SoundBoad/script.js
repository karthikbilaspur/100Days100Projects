const soundButtons = document.querySelectorAll('.sound-button');

soundButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const soundName = button.getAttribute('data-sound');
        playSound(soundName);
    });
});

function playSound(soundName) {
    const soundFile = `${soundName}.mp3`;
    const sound = new Audio(soundFile);
    sound.play();
}

// Add keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        const currentButton = document.activeElement;
        const previousButton = currentButton.previousElementSibling;
        if (previousButton) {
            previousButton.focus();
        }
    } else if (event.key === 'ArrowDown') {
        const currentButton = document.activeElement;
        const nextButton = currentButton.nextElementSibling;
        if (nextButton) {
            nextButton.focus();
        }
    } else if (event.key === 'Enter') {
        const currentButton = document.activeElement;
        if (currentButton.classList.contains('sound-button')) {
            const soundName = currentButton.getAttribute('data-sound');
            playSound(soundName);
        }
    }
});