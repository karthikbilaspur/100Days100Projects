// Get all gallery images
const galleryImages = document.querySelectorAll('.gallery-item img');
const body = document.body; // Reference to the body for overflow control

let currentImageIndex = -1; // To keep track of the currently viewed image
let overlay = null; // Reference to the overlay element

// --- Utility Functions ---

function createAndAppendElement(parent, tagName, classes = [], textContent = '', attributes = {}) {
    const element = document.createElement(tagName);
    if (classes.length > 0) {
        element.classList.add(...classes);
    }
    if (textContent) {
        element.textContent = textContent;
    }
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    parent.appendChild(element);
    return element;
}

// --- Overlay Control ---

function closeOverlay() {
    if (overlay) {
        overlay.classList.remove('active'); // Trigger fade-out animation
        // Allow time for fade-out transition before removing from DOM
        setTimeout(() => {
            if (overlay && overlay.parentNode) { // Check if it still exists
                overlay.remove();
            }
            overlay = null; // Clear reference
            currentImageIndex = -1; // Reset index
            body.style.overflow = ''; // Restore body scroll
            document.removeEventListener('keydown', handleKeyPress); // Remove key listener
        }, 300); // Match CSS transition duration
    }
}

function handleKeyPress(e) {
    if (!overlay) return; // Only respond if overlay is active
    if (e.key === 'Escape') {
        closeOverlay();
    } else if (e.key === 'ArrowLeft') {
        showImage(currentImageIndex - 1);
    } else if (e.key === 'ArrowRight') {
        showImage(currentImageIndex + 1);
    }
}

function showImage(index) {
    // Ensure index wraps around for continuous navigation
    if (index < 0) {
        index = galleryImages.length - 1;
    } else if (index >= galleryImages.length) {
        index = 0;
    }
    currentImageIndex = index;

    const imageElement = galleryImages[currentImageIndex];
    const imageSrc = imageElement.src;
    const imageAlt = imageElement.alt;
    const imageTitle = imageElement.getAttribute('data-title') || ''; // Get data-title
    const imageDescription = imageElement.getAttribute('data-description') || '';

    if (!overlay) {
        // Create full-screen overlay if it doesn't exist
        overlay = createAndAppendElement(body, 'div', ['overlay']);
        overlay.classList.add('active'); // Trigger fade-in animation
        body.style.overflow = 'hidden'; // Prevent body scroll when overlay is open

        // Add initial event listener to close the overlay
        overlay.addEventListener('click', (e) => {
            // Close if clicked on overlay background or close button
            if (e.target === overlay || e.target.classList.contains('close-button')) {
                closeOverlay();
            }
        });
        document.addEventListener('keydown', handleKeyPress); // Add key listener for keyboard navigation
    } else {
        // If overlay already exists, clear its previous content
        overlay.innerHTML = '';
    }

    // Add loading indicator
    const loadingIndicator = createAndAppendElement(overlay, 'div', ['loading-indicator'], 'Loading...');

    // Create a new image object to handle loading
    const tempImage = new Image();
    tempImage.src = imageSrc;

    tempImage.onload = () => {
        loadingIndicator.remove(); // Remove loading indicator once image is loaded

        const fullScreenImage = createAndAppendElement(overlay, 'img', ['full-screen-image'], '', {
            src: imageSrc,
            alt: imageAlt
        });
        fullScreenImage.classList.add('loaded'); // Add 'loaded' class to trigger image animation

        // Add image title (if available)
        if (imageTitle) {
            createAndAppendElement(overlay, 'p', ['full-screen-image-title'], imageTitle);
        }

        // Add image description
        createAndAppendElement(overlay, 'p', ['full-screen-image-description'], imageDescription);

        // Add close button
        createAndAppendElement(overlay, 'span', ['close-button'], '×');

        // Add navigation buttons
        const prevButton = createAndAppendElement(overlay, 'span', ['nav-button', 'prev-button'], '❮');
        prevButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent overlay from closing
            showImage(currentImageIndex - 1);
        });

        const nextButton = createAndAppendElement(overlay, 'span', ['nav-button', 'next-button'], '❯');
        nextButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent overlay from closing
            showImage(currentImageIndex + 1);
        });
    };

    tempImage.onerror = () => {
        loadingIndicator.textContent = 'Failed to load image.';
        // Optionally, add a retry button or close the overlay
    };
}

// --- Initialize Gallery Clicks ---

galleryImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        showImage(index);
    });
});

// --- Smooth Scrolling for Navigation Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Get the header height for accurate scroll position
            const headerHeight = document.querySelector('.main-header').offsetHeight;

            // Calculate position to scroll to
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight - 20; // -20 for a little extra padding

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});