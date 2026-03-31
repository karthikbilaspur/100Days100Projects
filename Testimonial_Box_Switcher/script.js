// This JavaScript code remains identical to the previous round.
// It is self-contained and only interacts with elements within the
//.testimonial-carousel. The only addition needed for the new
// page structure is the current year for the footer, which is
// already included from the prior round.

document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const config = {
        autoPlayInterval: 6000, // Time in ms for auto-play
        animationDuration: 400, // Matches CSS transition speed for card fade/slide
        initialDelay: 100, // Small delay for initial render
        testimonialData: [ // Array of testimonial objects
            {
                author: "John Doe",
                title: "CEO, InnovateX Solutions",
                avatar: "https://i.pravatar.cc/100?img=1", // Placeholder avatar
                rating: 5,
                textFront: "This product is a game-changer! The features are incredibly powerful and intuitive, making my workflow so much smoother. I can't imagine going back to how things were before. Highly recommended for anyone seeking top-tier solutions.",
                textBack: "I've been using this product for months now, and it continues to impress me with its robust performance and excellent support. It's an indispensable tool in my daily operations, consistently delivering outstanding results and reliability."
            },
            {
                author: "Jane Smith",
                title: "Marketing Director, GrowthUp Agency",
                avatar: "https://i.pravatar.cc/100?img=2",
                rating: 4,
                textFront: "I was blown away by the quality and efficiency of this service. It truly delivers on its promises, providing tangible results that have significantly boosted our team's productivity and client engagement. An outstanding tool!",
                textBack: "This product has exceeded my expectations in every way. The user interface is clean, the documentation is thorough, and the impact on our business metrics has been phenomenal. A definite must-have for modern teams."
            },
            {
                author: "Bob Johnson",
                title: "Lead Developer, TechConnect",
                avatar: "https://i.pravatar.cc/100?img=3",
                rating: 5,
                textFront: "Working with this platform has been a revelation. The codebase is clean, well-documented, and the API is incredibly flexible. It's allowed us to integrate complex functionalities with surprising ease.",
                textBack: "I highly recommend this product to anyone looking for quality, scalable, and reliable software. It's built on solid principles, performs exceptionally under load, and the development experience is fantastic."
            },
            {
                author: "Alice Williams",
                title: "Founder, CreativeSpark",
                avatar: "https://i.pravatar.cc/100?img=4",
                rating: 4,
                textFront: "As a small business owner, finding tools that are both powerful and affordable is key. This product fits the bill perfectly! It's streamlined our operations and provided excellent value for money.",
                textBack: "What I appreciate most is the responsiveness of the support team and the continuous improvements. They genuinely listen to feedback, and the product evolves to meet user needs, making it a reliable long-term partner."
            },
            {
                author: "David Lee",
                title: "Product Manager, Innovision Corp",
                avatar: "https://i.pravatar.cc/100?img=5",
                rating: 5,
                textFront: "The intuitive design and powerful features of this platform have drastically improved our product development lifecycle. It's a comprehensive solution that truly understands developer needs.",
                textBack: "From robust API integrations to seamless deployment, every aspect of this product is meticulously crafted. The team behind it is constantly innovating, making it an indispensable asset for our tech stack."
            }
        ]
    };

    // --- Selectors ---
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (!testimonialCarousel) {
        console.error('Testimonial carousel container not found.');
        return; // Exit if critical element is missing
    }

    const testimonialDisplayWrapper = testimonialCarousel.querySelector('.testimonial-display-wrapper');
    const prevButton = testimonialCarousel.querySelector('.control-button.prev');
    const nextButton = testimonialCarousel.querySelector('.control-button.next');
    const playPauseButton = testimonialCarousel.querySelector('.play-pause-button');
    const dotsContainer = testimonialCarousel.querySelector('.testimonial-dots-container');
    const autoplayProgressBar = testimonialCarousel.querySelector('.autoplay-progress-bar');

    // Basic error checking for elements
    if (!testimonialDisplayWrapper ||!prevButton ||!nextButton ||!playPauseButton ||!dotsContainer ||!autoplayProgressBar) {
        console.error('One or more essential carousel elements not found.');
        return;
    }

    // --- State ---
    let currentTestimonialIndex = 0;
    let autoPlayTimeoutId = null;
    let isPlaying = true;
    let testimonials = [];
    let touchStartX = 0;

    // --- Helper Functions ---

    /** Automatically set current year in footer */
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    /**
     * Creates star rating HTML.
     * @param {number} rating
     * @returns {string} HTML string for stars
     */
    function createStarRating(rating) {
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            starsHtml += `<span class="star" aria-hidden="true">${i < rating? '&#9733;' : '&#9734;'}</span>`;
        }
        return `<div class="testimonial-rating" aria-label="${rating} out of 5 stars">${starsHtml}</div>`;
    }

    /**
     * Creates a testimonial card element from data.
     * @param {object} data - Testimonial data
     * @param {number} index - Index of the testimonial
     * @returns {HTMLElement} The created testimonial card element
     */
    function createTestimonialCard(data, index) {
        const card = document.createElement('div');
        card.classList.add('testimonial-card');
        card.setAttribute('data-index', index);
        card.setAttribute('role', 'tabpanel');
        card.setAttribute('id', `testimonial-${index}`);
        card.setAttribute('aria-labelledby', `dot-${index}`);
        card.setAttribute('tabindex', '0');

        card.innerHTML = `
            <img src="${data.avatar}" alt="Avatar of ${data.author}" class="testimonial-avatar">
            <div class="testimonial-content">
                ${createStarRating(data.rating)}
                <p class="testimonial-text">${data.textFront}</p>
                <p class="testimonial-author">- ${data.author}, ${data.title}</p>
            </div>
            <div class="testimonial-flip-content">
                <p class="testimonial-text">${data.textBack}</p>
                <p class="testimonial-author">- ${data.author}, ${data.title}</p>
            </div>
        `;

        card.addEventListener('click', (event) => {
            if (event.target.tagName!== 'A') {
                card.classList.toggle('flipped');
                card.setAttribute('aria-expanded', card.classList.contains('flipped'));
            }
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === ' ' || event.key === 'Enter') {
                event.preventDefault();
                card.click();
            }
        });

        return card;
    }

    /**
     * Creates a dot control element.
     * @param {number} index - Index of the testimonial
     * @returns {HTMLElement} The created dot button element
     */
    function createDot(index) {
        const dot = document.createElement('button');
        dot.classList.add('testimonial-dot');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-controls', `testimonial-${index}`);
        dot.setAttribute('aria-label', `Show testimonial ${index + 1}`);
        dot.setAttribute('id', `dot-${index}`);
        dot.addEventListener('click', () => {
            showTestimonial(index);
            pauseAutoPlay();
        });
        return dot;
    }

    /**
     * Updates the displayed testimonial and active dot.
     * @param {number} index - Index of the testimonial to show
     * @param {string} direction - 'next' or 'prev' for animation
     */
    function showTestimonial(index, direction = 'next') {
        const totalTestimonials = config.testimonialData.length;
        if (totalTestimonials === 0) return;

        let newIndex = index;
        if (newIndex >= totalTestimonials) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = totalTestimonials - 1;
        }

        if (testimonials[currentTestimonialIndex]) {
            testimonials[currentTestimonialIndex].classList.remove('active', 'flipped');
            testimonials[currentTestimonialIndex].setAttribute('aria-hidden', 'true');
            testimonials[currentTestimonialIndex].setAttribute('aria-expanded', 'false');

            if (direction === 'next') {
                testimonials[currentTestimonialIndex].classList.add('prev-active');
            } else {
                testimonials[currentTestimonialIndex].classList.add('next-active');
            }
        }

        currentTestimonialIndex = newIndex;

        if (testimonials[currentTestimonialIndex]) {
            testimonials[currentTestimonialIndex].classList.remove('prev-active', 'next-active');
            testimonials[currentTestimonialIndex].classList.add('active');
            testimonials[currentTestimonialIndex].setAttribute('aria-hidden', 'false');
            testimonials[currentTestimonialIndex].focus();
        }

        const dots = dotsContainer.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, i) => {
            if (i === currentTestimonialIndex) {
                dot.classList.add('active');
                dot.setAttribute('aria-selected', 'true');
            } else {
                dot.classList.remove('active');
                dot.setAttribute('aria-selected', 'false');
            }
        });

        if (isPlaying) {
            startAutoPlay();
        }
    }

    /** Starts auto-play with progress bar animation. */
    function startAutoPlay() {
        if (!isPlaying) {
            isPlaying = true;
            playPauseButton.setAttribute('data-playing', 'true');
            playPauseButton.setAttribute('aria-label', 'Pause autoplay');
        }

        clearTimeout(autoPlayTimeoutId);
        autoplayProgressBar.style.transition = 'none';
        autoplayProgressBar.style.width = '0%';
        autoplayProgressBar.classList.remove('paused', 'active');

        void autoplayProgressBar.offsetWidth;

        setTimeout(() => {
            autoplayProgressBar.classList.add('active');
            autoplayProgressBar.style.transition = `width ${config.autoPlayInterval}ms linear`;
            autoplayProgressBar.style.width = '100%';
        }, 50);

        autoPlayTimeoutId = setTimeout(() => {
            showTestimonial(currentTestimonialIndex + 1);
        }, config.autoPlayInterval);
    }

    /** Pauses auto-play and progress bar. */
    function pauseAutoPlay() {
        if (isPlaying) {
            isPlaying = false;
            playPauseButton.setAttribute('data-playing', 'false');
            playPauseButton.setAttribute('aria-label', 'Play autoplay');
            clearTimeout(autoPlayTimeoutId);
            autoPlayTimeoutId = null;

            autoplayProgressBar.classList.add('paused');
            autoplayProgressBar.style.animationPlayState = 'paused';
        }
    }

    // --- Initialization ---

    /** Initializes the testimonial carousel. */
    function initCarousel() {
        if (config.testimonialData.length === 0) {
            testimonialCarousel.innerHTML = '<p style="text-align:center;">No testimonials available.</p>';
            return;
        }

        config.testimonialData.forEach((data, i) => {
            const card = createTestimonialCard(data, i);
            testimonialDisplayWrapper.appendChild(card);
            testimonials.push(card);

            const dot = createDot(i);
            dotsContainer.appendChild(dot);
        });

        showTestimonial(0);
        setTimeout(startAutoPlay, config.initialDelay);
    }

    // --- Event Listeners ---

    prevButton.addEventListener('click', () => {
        showTestimonial(currentTestimonialIndex - 1, 'prev');
        pauseAutoPlay();
    });

    nextButton.addEventListener('click', () => {
        showTestimonial(currentTestimonialIndex + 1, 'next');
        pauseAutoPlay();
    });

    playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
            pauseAutoPlay();
        } else {
            startAutoPlay();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            prevButton.click();
        } else if (event.key === 'ArrowRight') {
            nextButton.click();
        }
    });

    // --- Swipe/Touch Functionality ---
    testimonialDisplayWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    testimonialDisplayWrapper.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextButton.click();
            } else {
                prevButton.click();
            }
        }
    });

    initCarousel();
});