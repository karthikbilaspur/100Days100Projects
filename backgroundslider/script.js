const sliderContainer = document.querySelector('.slider-container');
const sliderElement = document.querySelector('.slider');
const paginationContainer = document.querySelector('.pagination');
const navigation = document.querySelector('.navigation');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Define slide data
const slidesData = [
    {
        backgroundImage: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        content: '<h2>Slide 1</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    },
    {
        backgroundImage: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
        content: '<h2>Slide 2</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    },
    {
        backgroundImage: 'https://images.unsplash.com/photo-1495467033336-2effd8753d51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        content: '<h2>Slide 3</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    },
    {
        backgroundImage: 'https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80',
        content: '<h2>Slide 4</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    },
    {
        backgroundImage: 'https://images.unsplash.com/photo-1559087867-ce4c91325525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        content: '<h2>Slide 5</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    },
];

// Function to generate slides
function generateSlides() {
    const slider = document.querySelector('.slider');
    slidesData.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.classList.add('slide');
        slideElement.style.backgroundImage = `url(${slide.backgroundImage})`;
        slideElement.innerHTML = slide.content;
        slider.appendChild(slideElement);
    });
}

// Function to generate pagination dots
function generatePaginationDots() {
    const paginationContainer = document.querySelector('.pagination');
    slidesData.forEach((slide, index) => {
        const paginationDot = document.createElement('div');
        paginationDot.classList.add('pagination-dot');
        paginationDot.addEventListener('click', () => {
            setActiveSlide(index);
        });
        paginationContainer.appendChild(paginationDot);
    });
}

// Function to set active slide
function setActiveSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const paginationDots = document.querySelectorAll('.pagination-dot');
    slides.forEach((slide, slideIndex) => {
        if (slideIndex === index) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
    paginationDots.forEach((dot, dotIndex) => {
        if (dotIndex === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Function to handle navigation button clicks
function handleNavigationButtonClick(event) {
    const target = event.target;
    if (target.classList.contains('prev-btn')) {
        const currentSlideIndex = Array.prototype.indexOf.call(document.querySelectorAll('.slide'), document.querySelector('.slide.active'));
        const prevSlideIndex = (currentSlideIndex - 1 + slidesData.length) % slidesData.length;
        setActiveSlide(prevSlideIndex);
    } else if (target.classList.contains('next-btn')) {
        const currentSlideIndex = Array.prototype.indexOf.call(document.querySelectorAll('.slide'), document.querySelector('.slide.active'));
        const nextSlideIndex = (currentSlideIndex + 1) % slidesData.length;
        setActiveSlide(nextSlideIndex);
    }
}

// Event listeners
document.querySelector('.prev-btn').addEventListener('click', handleNavigationButtonClick);
document.querySelector('.next-btn').addEventListener('click', handleNavigationButtonClick);

// Initialize slides and pagination dots
generateSlides();
generatePaginationDots();
setActiveSlide(0);

// Auto-play slides
setInterval(() => {
    const currentSlideIndex = Array.prototype.indexOf.call(document.querySelectorAll('.slide'), document.querySelector('.slide.active'));
    const nextSlideIndex = (currentSlideIndex + 1) % slidesData.length;
    setActiveSlide(nextSlideIndex);
}, 5000);

// Add keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        const currentSlideIndex = Array.prototype.indexOf.call(document.querySelectorAll('.slide'), document.querySelector('.slide.active'));
        const prevSlideIndex = (currentSlideIndex - 1 + slidesData.length) % slidesData.length;
        setActiveSlide(prevSlideIndex);
    } else if (event.key === 'ArrowRight') {
        const currentSlideIndex = Array.prototype.indexOf.call(document.querySelectorAll('.slide'), document.querySelector('.slide.active'));
        const nextSlideIndex = (currentSlideIndex + 1) % slidesData.length;
        setActiveSlide(nextSlideIndex);
    }
});

// Add touch navigation
const slider = document.querySelector('.slider');
let touchStartX = 0;
let touchMoveX = 0;
slider.addEventListener('touchstart', (event) => {
    touchStartX = event.touches[0].clientX;
});
slider.addEventListener('touchmove', (event) => {
    touchMoveX = event.touches[0].clientX;
});
slider.addEventListener('touchend', () => {
    if (touchMoveX - touchStartX > 50) {
        const currentSlideIndex = Array.prototype.indexOf.call(document.querySelectorAll('.slide'), document.querySelector('.slide.active'));
        const prevSlideIndex = (currentSlideIndex - 1 + slidesData.length) % slidesData.length;
        setActiveSlide(prevSlideIndex);
    } else if (touchMoveX - touchStartX < -50) {
        const currentSlideIndex = Array.prototype.indexOf.call(document.querySelectorAll('.slide'), document.querySelector('.slide.active'));
        const nextSlideIndex = (currentSlideIndex + 1) % slidesData.length;
        setActiveSlide(nextSlideIndex);
    }
});

// Lazy load images
const images = document.querySelectorAll('img');
images.forEach((image) => {
    image.addEventListener('load', () => {
        image.classList.add('loaded');
    });
});

// Add loading animation
const loadingAnimation = document.querySelector('.loading-animation');
loadingAnimation.addEventListener('animationend', () => {
    loadingAnimation.classList.add('hidden');
});

// Add accessibility features
const accessibilityButton = document.querySelector('.accessibility-button');
accessibilityButton.addEventListener('click', () => {
    const highContrastMode = document.querySelector('.high-contrast-mode');
    highContrastMode.classList.toggle('active');
});

// Add SEO optimization
const metaDescription = document.querySelector('meta[name="description"]');
metaDescription.content = 'This is a sample meta description for SEO optimization.';

// Add analytics integration
const analyticsButton = document.querySelector('.analytics-button');
analyticsButton.addEventListener('click', () => {
    const analyticsModal = document.querySelector('.analytics-modal');
    analyticsModal.classList.toggle('active');
});

// Add A/B testing integration
const abTestingButton = document.querySelector('.ab-testing-button');
abTestingButton.addEventListener('click', () => {
    const abTestingModal = document.querySelector('.ab-testing-modal');
    abTestingModal.classList.toggle('active');
});