// Constants
const SCROLL_ANIMATION_DURATION = 1000;
const SECTION_TRANSITION_DURATION = 1000;

// Selectors
const sections = document.querySelectorAll('.section');
const scrollIndicator = document.querySelector('.scroll-indicator');
const customScrollbar = document.querySelector('.custom-scrollbar');
const lazyLoadButtons = document.querySelectorAll('.lazy-load-button');

// Functions
function handleScroll() {
    const scrollPosition = window.scrollY;
    const scrollHeight = document.body.offsetHeight - window.innerHeight;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop - window.innerHeight * 0.5 && scrollPosition < sectionTop + sectionHeight - window.innerHeight * 0.5) {
            section.classList.add('active');
        } else {
            section.classList.remove('active'); // Added missing remove('active')
        }
    });
} // Added missing closing bracket

function handleLazyLoadButtonClick(event) {
    const button = event.target;
    const section = button.parentNode;
    section.style.backgroundImage = 'url(https://picsum.photos/2000/1000)';
}

function handleKeyboardNavigation(event) {
    if (event.key === 'ArrowDown') {
        const activeSection = document.querySelector('.section.active');
        const nextSection = activeSection.nextElementSibling;

        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (event.key === 'ArrowUp') {
        const activeSection = document.querySelector('.section.active');
        const prevSection = activeSection.previousElementSibling;

        if (prevSection) {
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function handleSectionClick(event) {
    const section = event.target;
    section.classList.toggle('active');
}

// Event listeners
window.addEventListener('scroll', handleScroll);

lazyLoadButtons.forEach((button) => {
    button.addEventListener('click', handleLazyLoadButtonClick);
});

document.addEventListener('keydown', handleKeyboardNavigation);

sections.forEach((section) => {
    section.addEventListener('click', handleSectionClick);
});

// Timeline animation
const timeline = [
    { section: sections[0], delay: 0 },
    { section: sections[1], delay: SCROLL_ANIMATION_DURATION },
    { section: sections[2], delay: SCROLL_ANIMATION_DURATION * 2 },
];

timeline.forEach((item) => {
    setTimeout(() => {
        item.section.classList.add('active');
    }, item.delay);
});

// Accessibility features
document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
        const focusableElements = document.querySelectorAll('.section, .lazy-load-button');
        const currentIndex = Array.prototype.indexOf.call(focusableElements, document.activeElement);
        const nextIndex = (currentIndex + 1) % focusableElements.length;
        focusableElements[nextIndex].focus();
    }
});