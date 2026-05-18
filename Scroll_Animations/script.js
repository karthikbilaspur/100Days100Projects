// ==========================================================
// Constants and Configuration
// ==========================================================
const SCROLL_ANIMATION_DURATION_MS = 800; // Time for section entry/exit animation (ms)
const SCROLL_BEHAVIOR_DURATION_MS = 600; // Time for scrollIntoView smooth behavior (ms)
const SCROLL_THROTTLE_DELAY_MS = 100; // How often scroll handler runs (ms)
const SECTION_ACTIVATION_THRESHOLD = 0.6; // % of viewport height to consider section active (0.5 means half viewport)

// ==========================================================
// Selectors and DOM Elements
// ==========================================================
const sections = Array.from(document.querySelectorAll('.section')); // Convert NodeList to Array
const scrollIndicatorBar = document.querySelector('.scroll-indicator-bar'); // The inner, moving bar
const customScrollbarThumb = document.querySelector('.custom-scrollbar-thumb'); // The custom thumb
const lazyLoadButtons = Array.from(document.querySelectorAll('.lazy-load-button'));

// ==========================================================
// State Variables
// ==========================================================
let isScrolling = false; // Flag to prevent multiple scroll animations simultaneously
let activeSectionIndex = -1; // Keep track of the currently active section

// ==========================================================
// Utility Functions
// ==========================================================

// Throttles a function to run at most once per `delay` milliseconds
function throttle(func, delay) {
    let timeoutId;
    let lastArgs;
    let lastThis;

    return function(...args) {
        lastArgs = args;
        lastThis = this;
        if (!timeoutId) {
            timeoutId = setTimeout(() => {
                func.apply(lastThis, lastArgs);
                timeoutId = null;
                lastArgs = null;
                lastThis = null;
            }, delay);
        }
    };
}

// ==========================================================
// Main Functionality
// ==========================================================

/**
 * Updates which section is currently "active" based on scroll position.
 * Also updates the scroll indicator and custom scrollbar.
 */
function updateScrollState() {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight; // Use documentElement for full height

    // --- Update Scroll Indicator Bar ---
    const scrollProgress = scrollPosition / (documentHeight - viewportHeight);
    if (scrollIndicatorBar) {
        scrollIndicatorBar.style.width = `${scrollProgress * 100}%`;
    }

    // --- Update Custom Scrollbar Thumb Position ---
    if (customScrollbarThumb) {
        const thumbHeight = customScrollbarThumb.offsetHeight;
        const scrollableHeight = documentHeight - viewportHeight;
        const thumbTrackHeight = window.innerHeight - thumbHeight; // Total height thumb can move
        const thumbPosition = (scrollPosition / scrollableHeight) * thumbTrackHeight;
        customScrollbarThumb.style.transform = `translateY(${thumbPosition}px)`;
    }

    // --- Determine Active Section ---
    let newActiveSectionIndex = -1;
    sections.forEach((section, index) => {
        const sectionRect = section.getBoundingClientRect(); // Get position relative to viewport
        // Check if section is within the activation threshold (e.g., more than 60% visible in viewport)
        if (sectionRect.top < viewportHeight * SECTION_ACTIVATION_THRESHOLD &&
            sectionRect.bottom > viewportHeight * (1 - SECTION_ACTIVATION_THRESHOLD)) {
            newActiveSectionIndex = index;
        }
    });

    if (newActiveSectionIndex!== activeSectionIndex) {
        // Deactivate old section
        if (activeSectionIndex!== -1) {
            sections[activeSectionIndex].classList.remove('active');
            sections[activeSectionIndex].setAttribute('aria-current', 'false');
        }
        // Activate new section
        if (newActiveSectionIndex!== -1) {
            sections[newActiveSectionIndex].classList.add('active');
            sections[newActiveSectionIndex].setAttribute('aria-current', 'true');
        }
        activeSectionIndex = newActiveSectionIndex;
    }
}

/**
 * Handles lazy loading an image for a section.
 */
function handleLazyLoadButtonClick(event) {
    const button = event.target;
    const section = button.closest('.section'); // Use.closest for robust parent finding
    if (!section || section.dataset.imageLoaded === 'true') return;

    // Add a loading class for visual feedback
    section.classList.add('loading-image');
    button.disabled = true; // Disable button while loading

    const imageUrl = `https://picsum.photos/seed/${section.id}/2000/1000`; // Use section ID for unique image
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
        section.style.backgroundImage = `url(${imageUrl})`;
        section.classList.remove('loading-image');
        section.classList.add('image-loaded');
        section.dataset.imageLoaded = 'true';
        button.remove(); // Remove button after image is loaded
        // Inform screen readers
        setTimeout(() => {
             section.setAttribute('aria-live', 'polite');
             section.setAttribute('aria-label', `Section ${section.id.split('-')[1]} background image loaded`);
        }, 100);
    };

    img.onerror = () => {
        console.error(`Failed to load image for ${section.id}: ${imageUrl}`);
        section.classList.remove('loading-image');
        button.disabled = false; // Re-enable button on error
        button.textContent = 'Failed to load, try again?';
    };
}

/**
 * Handles keyboard navigation for scrolling between sections.
 */
function handleKeyboardNavigation(event) {
    if (isScrolling) return; // Prevent navigation during existing scroll

    let targetSection = null;

    if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') { // Space for PageDown-like behavior
        const currentActiveIndex = activeSectionIndex === -1? 0 : activeSectionIndex; // Start from first if no active
        targetSection = sections[currentActiveIndex + 1];
        event.preventDefault(); // Prevent default browser scroll
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        const currentActiveIndex = activeSectionIndex === -1? 0 : activeSectionIndex;
        targetSection = sections[currentActiveIndex - 1];
        event.preventDefault(); // Prevent default browser scroll
    } else if (event.key === 'Home') {
        targetSection = sections[0];
        event.preventDefault();
    } else if (event.key === 'End') {
        targetSection = sections[sections.length - 1];
        event.preventDefault();
    }

    if (targetSection) {
        isScrolling = true;
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Reset isScrolling flag after animation duration
        setTimeout(() => {
            isScrolling = false;
        }, SCROLL_BEHAVIOR_DURATION_MS);
    }
}

/**
 * Toggles 'active' class on section click (mostly for debugging/demonstration).
 */
function handleSectionClick(event) {
    // This function might be removed if it's not a desired interactive feature
    // For now, let's keep it simple: if a section is clicked, make it active
    const clickedSection = event.target.closest('.section');
    if (clickedSection && activeSectionIndex!== sections.indexOf(clickedSection)) {
        // This will be handled by the scroll event once you scroll to it naturally
        // Or if you want click to forcefully activate:
        // sections[activeSectionIndex]?.classList.remove('active');
        // clickedSection.classList.add('active');
        // activeSectionIndex = sections.indexOf(clickedSection);
        // updateScrollState(); // Force update scroll state immediately
    }
}

/**
 * Initializes the page after DOM is loaded.
 */
function initializePage() {
    updateScrollState(); // Set initial active section and scroll indicator
    // Add event listeners
    window.addEventListener('scroll', throttle(updateScrollState, SCROLL_THROTTLE_DELAY_MS));
    lazyLoadButtons.forEach((button) => {
        button.addEventListener('click', handleLazyLoadButtonClick);
    });
    document.addEventListener('keydown', handleKeyboardNavigation);
    sections.forEach((section) => {
        section.addEventListener('click', handleSectionClick); // Keep for potential interaction
    });

    // Optional: Auto-scroll to first section if not already at top
    if (window.scrollY === 0 && sections.length > 0) {
        sections[0].scrollIntoView({ behavior: 'auto' });
    }
}

// ==========================================================
// Event Listeners (DOM Load)
// ==========================================================
document.addEventListener('DOMContentLoaded', initializePage);

// ==========================================================
// Accessibility Features - Tab Navigation (Enhanced)
// ==========================================================
// This handles tab focusing between sections and buttons within them
document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
        // Find all focusable elements within the current context
        const focusableElements = document.querySelectorAll(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        // If the shift key is held, tab backwards
        if (event.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                event.preventDefault();
            }
        } else { // Tab forwards
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                event.preventDefault();
            }
        }
    }
});

// Initial 'active' class for the first section without animation on load
if (sections.length > 0) {
    sections[0].classList.add('active');
    sections[0].setAttribute('aria-current', 'true');
}