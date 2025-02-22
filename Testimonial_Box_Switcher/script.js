// Constants
const AUTO_PLAY_INTERVAL = 5000;
const TESTIMONIAL_CLASS = 'testimonial-card';
const ACTIVE_CLASS = 'active';

// Selectors
const testimonialContainer = document.querySelector('.testimonial-container');
const testimonialCards = document.querySelectorAll(`.${TESTIMONIAL_CLASS}`);
const prevButton = document.querySelector('.testimonial-prev');
const nextButton = document.querySelector('.testimonial-next');
const playPauseButton = document.querySelector('.testimonial-play-pause');
const dots = document.querySelectorAll('.testimonial-dot');

// State
let currentTestimonial = 0;
let autoPlayIntervalId = null;
let isPlaying = false;

// Functions
function updateTestimonial() {
    // Remove active class from all cards
    testimonialCards.forEach((card) => card.classList.remove(ACTIVE_CLASS));
    // Add active class to current card
    testimonialCards[currentTestimonial].classList.add(ACTIVE_CLASS);

    // Remove active class from all dots
    dots.forEach((dot) => dot.classList.remove(ACTIVE_CLASS));
    // Add active class to current dot
    dots[currentTestimonial].classList.add(ACTIVE_CLASS);
}

function playTestimonial() {
    isPlaying = true;
    autoPlayIntervalId = setInterval(() => {
        nextButton.click();
    }, AUTO_PLAY_INTERVAL);
    playPauseButton.textContent = 'Pause';
}

function pauseTestimonial() {
    isPlaying = false;
    clearInterval(autoPlayIntervalId);
    playPauseButton.textContent = 'Play';
}

function handleCardClick(event) {
    const card = event.target.closest(`.${TESTIMONIAL_CLASS}`);
    if (card) {
        card.classList.toggle('flip');
    }
}

// Event listeners
prevButton.addEventListener('click', () => {
    currentTestimonial--;
    if (currentTestimonial < 0) {
        currentTestimonial = testimonialCards.length - 1;
    }
    updateTestimonial();
});

nextButton.addEventListener('click', () => {
    currentTestimonial++;
    if (currentTestimonial >= testimonialCards.length) {
        currentTestimonial = 0;
    }
    updateTestimonial();
});

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        pauseTestimonial();
    } else {
        playTestimonial();
    }
});

testimonialCards.forEach((card) => {
    card.addEventListener('click', handleCardClick);
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        prevButton.click();
    } else if (event.key === 'ArrowRight') {
        nextButton.click();
    }
});

// Initialize testimonial
updateTestimonial();