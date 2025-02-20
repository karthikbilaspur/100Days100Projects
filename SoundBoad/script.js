// Get sound buttons
const soundButtons = document.querySelectorAll('.sound-button');

// Add event listeners to sound buttons
soundButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const soundName = button.getAttribute('data-sound');
        playSound(soundName);
    });
});

// Play sound function
async function playSound(soundName) {
    try {
        const soundFile = `${soundName}.mp3`;
        const sound = new Audio(soundFile);
        await sound.play();
    } catch (error) {
        console.error(`Error playing sound: ${error}`);
    }
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

// Add volume control
const volumeSlider = document.getElementById('volume-slider');
const volumeLevel = document.getElementById('volume-level');

volumeSlider.addEventListener('input', () => {
    const volume = volumeSlider.value;
    volumeLevel.textContent = `${volume}%`;
});

// Add search functionality
const searchForm = document.querySelector('.search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value.toLowerCase();
    const soundButtons = document.querySelectorAll('.sound-button');
    soundButtons.forEach((button) => {
        const soundName = button.getAttribute('data-sound');
        if (soundName.toLowerCase().includes(searchTerm)) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
});