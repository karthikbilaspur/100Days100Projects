const sliderContainer = document.querySelector('.slider-container');
const slideRight = document.querySelector('.right-slide');
const slideLeft = document.querySelector('.left-slide');
const upButton = document.querySelector('.up-button');
const downButton = document.querySelector('.down-button');
const paginationDotsContainer = document.querySelector('.pagination-dots');

// Get all individual slides from both left and right
const leftSlides = slideLeft.querySelectorAll('div');
const rightSlides = slideRight.querySelectorAll('div');
const slidesLength = rightSlides.length;

let activeSlideIndex = 0;
let autoPlayInterval; // For auto-play functionality

// --- Initial Setup ---
// Set initial positions and apply backgrounds from data attributes
function initializeSlider() {
    // Apply backgrounds from data attributes
    leftSlides.forEach((slide, index) => {
        const color = slide.getAttribute('data-color');
        if (color) {
            slide.style.backgroundColor = color;
        }
    });

    rightSlides.forEach((slide, index) => {
        const imageUrl = slide.getAttribute('data-image');
        if (imageUrl) {
            slide.style.backgroundImage = `url('${imageUrl}')`;
        }
    });

    // Set initial left slide position
    // The left slide starts at the bottom and moves up.
    // So, to show the first slide (index 0), its container needs to be translated
    // by (slidesLength - 1) * 100vh upwards.
    // Example: For 5 slides, (5-1) * 100vh = 400vh.
    slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`;

    updateSliderPosition(); // Apply initial positioning based on activeSlideIndex
    createPaginationDots();
    updatePaginationDots();
}

// --- Event Listeners ---
upButton.addEventListener('click', () => changeSlide('up'));
downButton.addEventListener('click', () => changeSlide('down'));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        changeSlide('up');
    } else if (e.key === 'ArrowDown') {
        changeSlide('down');
    }
});

// Window resize listener
window.addEventListener('resize', updateSliderPosition);

// --- Core Logic ---
const changeSlide = (direction) => {
    if (direction === 'up') {
        activeSlideIndex++;
        if (activeSlideIndex > slidesLength - 1) {
            activeSlideIndex = 0; // Loop back to the first slide
        }
    } else if (direction === 'down') {
        activeSlideIndex--;
        if (activeSlideIndex < 0) {
            activeSlideIndex = slidesLength - 1; // Loop back to the last slide
        }
    }
    updateSliderPosition();
    updatePaginationDots();
    resetAutoPlay(); // Reset autoplay timer on manual interaction
};

const updateSliderPosition = () => {
    const sliderHeight = sliderContainer.clientHeight; // Get current slider height

    slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
    // The left slide moves in the opposite direction.
    // The initial top offset was negative to bring the last slide to the top.
    // So, as activeSlideIndex increases, we move it *up* by reducing the negative offset.
    slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
};

// --- Pagination Dots ---
const createPaginationDots = () => {
    paginationDotsContainer.innerHTML = ''; // Clear existing dots
    for (let i = 0; i < slidesLength; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.dataset.index = i; // Store slide index
        dot.addEventListener('click', () => {
            activeSlideIndex = i;
            updateSliderPosition();
            updatePaginationDots();
            resetAutoPlay();
        });
        paginationDotsContainer.appendChild(dot);
    }
};

const updatePaginationDots = () => {
    const dots = paginationDotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === activeSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
};

// --- Auto-play ---
const startAutoPlay = () => {
    // Check if there's more than one slide to auto-play
    if (slidesLength > 1) {
        autoPlayInterval = setInterval(() => {
            changeSlide('up'); // Go to the next slide automatically
        }, 5000); // Change slide every 5 seconds
    }
};

const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
};

const resetAutoPlay = () => {
    stopAutoPlay();
    startAutoPlay();
};

// --- Initialize on Load ---
document.addEventListener('DOMContentLoaded', () => {
    initializeSlider();
    startAutoPlay(); // Start auto-play when the page loads
});