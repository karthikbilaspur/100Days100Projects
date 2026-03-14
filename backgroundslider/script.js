const sliderContainer = document.querySelector('.slider-container');
const sliderElement = document.querySelector('.slider');
const paginationContainer = document.querySelector('.pagination');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const loadingOverlay = document.querySelector('.loading-overlay'); // Get loading overlay

let currentSlideIndex = 0;
let autoPlayInterval;
const AUTO_PLAY_DELAY = 5000; // 5 seconds

// Define slide data - you can make this dynamic if fetching from an API
const slidesData = [
    {
        backgroundImage: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        content: '<h2>Majestic Mountains</h2><p>Experience the grandeur of nature\'s towering giants.</p>',
    },
    {
        backgroundImage: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
        content: '<h2>Serene Lake Views</h2><p>Find peace and tranquility by the water\'s edge.</p>',
    },
    {
        backgroundImage: 'https://images.unsplash.com/photo-1495467033336-2effd8753d51?ixlib=rb-1.2.1&ixid=eyJhcGfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        content: '<h2>Lush Green Forests</h2><p>Immerse yourself in the vibrant beauty of the woods.</p>',
    },
    {
        backgroundImage: 'https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80',
        content: '<h2>Coastal Wonders</h2><p>Feel the breeze and embrace the boundless ocean horizon.</p>',
    },
    {
        backgroundImage: 'https://images.unsplash.com/photo-1559087867-ce4c91325525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        content: '<h2>Desert Landscapes</h2><p>Discover the stark and captivating beauty of arid lands.</p>',
    },
];

// Function to preload all background images
async function preloadImages() {
    const promises = slidesData.map(slide => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = slide.backgroundImage;
            img.onload = resolve;
            img.onerror = reject;
        });
    });
    return Promise.all(promises);
}

// Function to generate slides
function generateSlides() {
    slidesData.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.classList.add('slide');
        slideElement.style.backgroundImage = `url(${slide.backgroundImage})`;
        slideElement.innerHTML = `<div class="slide-content">${slide.content}</div>`; // Wrap content for better styling
        slideElement.setAttribute('role', 'group');
        slideElement.setAttribute('aria-roledescription', 'slide');
        slideElement.setAttribute('aria-label', `Slide ${index + 1} of ${slidesData.length}`);
        sliderElement.appendChild(slideElement);
    });
}

// Function to generate pagination dots
function generatePaginationDots() {
    slidesData.forEach((slide, index) => {
        const paginationDot = document.createElement('button'); // Changed to button for accessibility
        paginationDot.classList.add('pagination-dot');
        paginationDot.setAttribute('role', 'tab');
        paginationDot.setAttribute('aria-controls', `slide-${index}`);
        paginationDot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        paginationDot.addEventListener('click', () => {
            setActiveSlide(index);
            resetAutoPlay(); // Reset autoplay on manual interaction
        });
        paginationContainer.appendChild(paginationDot);
    });
}

// Function to set active slide
function setActiveSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const paginationDots = document.querySelectorAll('.pagination-dot');

    if (index < 0 || index >= slides.length) {
        console.error("Invalid slide index:", index);
        return;
    }

    // Remove active class from all
    slides.forEach((slide, slideIndex) => {
        slide.classList.remove('active');
        slide.setAttribute('aria-hidden', 'true'); // Hide from screen readers
        if (slideIndex === currentSlideIndex) {
            slide.setAttribute('tabindex', '-1'); // Make current non-active slide unfocusable
        }
    });
    paginationDots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide
    slides[index].classList.add('active');
    slides[index].setAttribute('aria-hidden', 'false'); // Show to screen readers
    slides[index].setAttribute('tabindex', '0'); // Make active slide focusable
    paginationDots[index].classList.add('active');
    paginationDots[index].setAttribute('aria-selected', 'true');

    currentSlideIndex = index;
    // Announce slide change for screen readers (if not already handled by aria-live="polite" on.slider)
    // You might need a more sophisticated live region if aria-live="polite" isn't sufficient
}

// Function to advance to the next slide
function showNextSlide() {
    const nextSlideIndex = (currentSlideIndex + 1) % slidesData.length;
    setActiveSlide(nextSlideIndex);
}

// Function to go to the previous slide
function showPrevSlide() {
    const prevSlideIndex = (currentSlideIndex - 1 + slidesData.length) % slidesData.length;
    setActiveSlide(prevSlideIndex);
}

// Autoplay functionality
function startAutoPlay() {
    stopAutoPlay(); // Clear any existing interval first
    autoPlayInterval = setInterval(showNextSlide, AUTO_PLAY_DELAY);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Event listeners for navigation buttons
prevBtn.addEventListener('click', () => {
    showPrevSlide();
    resetAutoPlay();
});
nextBtn.addEventListener('click', () => {
    showNextSlide();
    resetAutoPlay();
});

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        showPrevSlide();
        resetAutoPlay();
    } else if (event.key === 'ArrowRight') {
        showNextSlide();
        resetAutoPlay();
    }
});

// Touch navigation
let touchStartX = 0;
sliderElement.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
    stopAutoPlay(); // Pause autoplay on touch interaction
}, { passive: true }); // Use passive listener for performance

sliderElement.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0].clientX;
    const swipeThreshold = 50; // Minimum pixels to register a swipe

    if (touchEndX - touchStartX > swipeThreshold) { // Swiped right (prev)
        showPrevSlide();
    } else if (touchStartX - touchEndX > swipeThreshold) { // Swiped left (next)
        showNextSlide();
    }
    startAutoPlay(); // Resume autoplay after touch interaction
}, { passive: true });

// --- Initialization ---
async function initializeSlider() {
    generateSlides();
    generatePaginationDots();

    // Preload images before setting active slide and hiding loading overlay
    try {
        await preloadImages();
        console.log("All images preloaded.");
        loadingOverlay.classList.add('hidden'); // Hide loading overlay
        setActiveSlide(currentSlideIndex); // Set the initial active slide
        startAutoPlay(); // Start autoplay only after everything is ready
    } catch (error) {
        console.error("Error preloading images:", error);
        loadingOverlay.innerHTML = '<p>Error loading images. Please try again.</p>';
    }
}

document.addEventListener('DOMContentLoaded', initializeSlider);

