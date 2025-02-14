// script.js

const testimonialContainer = document.querySelector('.testimonial-container');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialBoxes = document.querySelectorAll('.testimonial-box');
const prevButton = document.querySelector('.testimonial-prev');
const nextButton = document.querySelector('.testimonial-next');
const playPauseButton = document.querySelector('.testimonial-play-pause');
const dots = document.querySelectorAll('.testimonial-dot');
let currentTestimonial = 0;
let autoPlayInterval = null;
let isPlaying = false;

testimonialCards.forEach((card, index) => {
    if (index === 0) {
        card.classList.add('active');
    } else {
        card.classList.remove('active');
    }
});

testimonialBoxes.forEach((box, index) => {
    if (index === 0) {
        box.classList.add('active');
    } else {
        box.classList.remove('active');
    }
});

dots.forEach((dot, index) => {
    if (index === 0) {
        dot.classList.add('active');
    } else {
        dot.classList.remove('active');
    }
});

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
    card.addEventListener('click', () => {
        card.classList.toggle('flip');
    });
});

function updateTestimonial() {
    testimonialCards.forEach((card) => {
        card.classList.remove('active');
    });
    testimonialCards[currentTestimonial].classList.add('active');

    testimonialBoxes.forEach((box) => {
        box.classList.remove('active');
    });
    testimonialBoxes[currentTestimonial].classList.add('active');

    dots.forEach((dot) => {
        dot.classList.remove('active');
    });
    dots[currentTestimonial].classList.add('active');
}

function playTestimonial() {
    isPlaying = true;
    autoPlayInterval = setInterval(() => {
        nextButton.click();
    }, 5000);
    playPauseButton.textContent = 'Pause';
}

function pauseTestimonial() {
    isPlaying = false;
    clearInterval(autoPlayInterval);
    playPauseButton.textContent = 'Play';
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        prevButton.click();
    } else if (event.key === 'ArrowRight') {
        nextButton.click();
    }
});