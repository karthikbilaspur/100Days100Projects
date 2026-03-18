document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.getElementById('carousel-container');
    const categoryFilter = document.getElementById('category-filter');
    const searchInput = document.getElementById('search-input');
    const searchAnnouncer = document.getElementById('search-announcer');
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    const heroSection = document.getElementById('home'); // New: Reference to hero section
    const startExploringBtn = heroSection.querySelector('.action-button.primary'); // New

    // --- Card Data ---
    // Added 'category' property directly to each card for easier filtering
    const cardData = {
        nature: [
            {
                id: 'nature-1',
                imageSrc: 'https://picsum.photos/id/10/800/600',
                imageAlt: 'Beautiful landscape with mountains and lake',
                title: 'Mountain Serenity',
                excerpt: 'Discover the tranquility of the majestic mountains and crystal clear lakes. An adventure awaits!',
                details: 'Explore breathtaking trails, enjoy serene picnics by the water, and capture stunning panoramic views. Perfect for nature lovers and photographers. The crisp mountain air rejuvenates the spirit.',
                features: ['Difficulty: Moderate', 'Best Season: Summer, Autumn', 'Activities: Hiking, Photography, Wildlife Spotting'],
                buttonText: 'Learn More',
                category: 'nature'
            },
            {
                id: 'nature-2',
                imageSrc: 'https://picsum.photos/id/1043/800/600',
                imageAlt: 'Lush green forest with sunlight filtering through trees',
                title: 'Enchanted Forest',
                excerpt: 'Lose yourself in the ancient, mystical woods where every tree tells a story.',
                details: 'Wander through dense canopies, spot rare wildlife, and listen to the symphony of nature. Ideal for peaceful retreats and nature walks. Every step uncovers a hidden wonder.',
                features: ['Difficulty: Easy', 'Best Season: Spring, Summer', 'Activities: Bird Watching, Meditation, Foraging'],
                buttonText: 'Explore Trails',
                category: 'nature'
            },
            {
                id: 'nature-3',
                imageSrc: 'https://picsum.photos/id/105/800/600',
                imageAlt: 'Vast open desert under a clear sky',
                title: 'Desert Dunes',
                excerpt: 'Witness the raw beauty and silence of an endless desert landscape.',
                details: 'Experience mesmerizing sunsets over rolling sand dunes, stargaze under unpolluted skies, and embark on thrilling desert safaris. The quiet vastness offers profound reflection.',
                features: ['Difficulty: Challenging', 'Best Season: Winter', 'Activities: Dune Bashing, Stargazing, Camel Rides'],
                buttonText: 'Plan Expedition',
                category: 'nature'
            },
            {
                id: 'nature-4',
                imageSrc: 'https://picsum.photos/id/1018/800/600',
                imageAlt: 'Waves crashing on a rugged coastline',
                title: 'Coastal Wonders',
                excerpt: 'Feel the spray and power of the ocean along dramatic coastlines.',
                details: 'Discover hidden coves, explore tidal pools, and enjoy the refreshing sea breeze. Perfect for coastal hikes and marine life observation. The rhythm of the waves is truly captivating.',
                features: ['Difficulty: Varied', 'Best Season: All Year', 'Activities: Surfing, Beachcombing, Cliff Walks'],
                buttonText: 'Discover Bays',
                category: 'nature'
            }
        ],
        city: [
            {
                id: 'city-1',
                imageSrc: 'https://picsum.photos/id/30/800/600',
                imageAlt: 'Vibrant cityscape at night with neon lights',
                title: 'Urban Pulse',
                excerpt: 'Experience the exhilarating energy of a bustling metropolis after dark.',
                details: 'From towering skyscrapers to lively street markets, discover the endless entertainment, diverse cuisine, and vibrant nightlife that a modern city offers. The city never sleeps, and neither will your adventure.',
                features: ['Attractions: Rooftop Bars, Museums, Shopping', 'Cuisine: International, Street Food', 'Transport: Efficient Metro System'],
                buttonText: 'Discover Nightlife',
                category: 'city'
            },
            {
                id: 'city-2',
                imageSrc: 'https://picsum.photos/id/250/800/600',
                imageAlt: 'Historic European street with old buildings and cafes',
                title: 'Old Town Charm',
                excerpt: 'Stroll through cobblestone streets and soak in the rich history of an ancient European city.',
                details: 'Visit grand cathedrals, explore quaint boutiques, and savor traditional pastries in charming cafes. Perfect for cultural immersion. History whispers from every ancient wall.',
                features: ['Era: Medieval, Renaissance', 'Atmosphere: Romantic, Quaint', 'Activities: Walking Tours, Cafe Hopping, Art Galleries'],
                buttonText: 'Book Walking Tour',
                category: 'city'
            },
            {
                id: 'city-3',
                imageSrc: 'https://picsum.photos/id/237/800/600',
                imageAlt: 'Modern city skyline at sunset',
                title: 'Metropolitan Horizon',
                excerpt: 'Witness the breathtaking views from the highest points of a thriving urban center.',
                details: 'Ascend observation decks, dine in sky-high restaurants, and capture stunning panoramic photos of the city lights stretching to the horizon. A panorama of possibilities awaits.',
                features: ['Viewpoints: Skyscrapers, Ferris Wheels', 'Dining: Fine Dining, Rooftop Bars', 'Photography: Sunset, Nightscapes'],
                buttonText: 'Find Best Views',
                category: 'city'
            },
            {
                id: 'city-4',
                imageSrc: 'https://picsum.photos/id/15/800/600',
                imageAlt: 'Busy street market in an Asian city',
                title: 'Market Bustle',
                excerpt: 'Dive into the vibrant chaos and sensory delights of a bustling street market.',
                details: 'Sample exotic street food, haggle for unique souvenirs, and experience the lively atmosphere of local commerce and culture. A true feast for the senses.',
                features: ['Products: Crafts, Spices, Apparel', 'Food: Local Delicacies, Street Eats', 'Experience: Cultural Immersion, Shopping'],
                buttonText: 'Shop Local',
                category: 'city'
            }
        ]
    };

    // Combine all card data into a single array for easier searching/filtering
    const allCards = [
        ...cardData.nature, // Category property is already in these
        ...cardData.city
    ];

    /**
     * Creates an expanding card DOM element from card data.
     * @param {object} cardInfo - The data for the card.
     * @returns {HTMLElement} The created card element.
     */
    function createCardElement(cardInfo) {
        const card = document.createElement('div');
        card.className = 'expanding-card';
        card.setAttribute('role', 'region');
        card.setAttribute('aria-labelledby', `card-title-${cardInfo.id}`);
        card.setAttribute('tabindex', '0'); // Make card focusable
        card.setAttribute('aria-expanded', 'false');
        card.dataset.id = cardInfo.id; // Store ID for potential direct linking

        // Added small optimization: Only render details if card is expanded initially by URL hash
        const isInitiallyExpanded = window.location.hash.substring(1) === cardInfo.id;
        const cardDetailsHtml = `
            <div class="card-details" aria-hidden="${!isInitiallyExpanded}">
                <p>${cardInfo.details}</p>
                <ul>
                    ${cardInfo.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <button class="action-button">${cardInfo.buttonText}</button>
            </div>
        `;

        card.innerHTML = `
            <button class="close-card" aria-label="Close card ${cardInfo.title}" aria-hidden="${!isInitiallyExpanded}">&times;</button>
            <img src="${cardInfo.imageSrc}" alt="${cardInfo.imageAlt}">
            <div class="card-content">
                <h3 id="card-title-${cardInfo.id}" class="card-title">${cardInfo.title}</h3>
                <p class="card-excerpt">${cardInfo.excerpt}</p>
                ${cardDetailsHtml}
            </div>
        `;

        // If card is initially expanded, add the class
        if (isInitiallyExpanded) {
            card.classList.add('is-expanded');
            card.setAttribute('aria-expanded', 'true');
        }

        addCardEventListeners(card);
        return card;
    }

    /**
     * Toggles the expansion state of a card.
     * @param {HTMLElement} cardElement - The card DOM element.
     * @param {boolean} [forceClose=false] - If true, forces the card to close.
     */
    function toggleCard(cardElement, forceClose = false) {
        const isExpanded = cardElement.classList.contains('is-expanded');

        // Close all other expanded cards first
        document.querySelectorAll('.expanding-card.is-expanded').forEach(c => {
            if (c !== cardElement) {
                c.classList.remove('is-expanded');
                c.setAttribute('aria-expanded', 'false');
                c.querySelector('.card-details').setAttribute('aria-hidden', 'true');
                const closeBtn = c.querySelector('.close-card');
                if (closeBtn) closeBtn.setAttribute('aria-hidden', 'true');
            }
        });

        // Toggle the clicked card or force close
        if (!isExpanded && !forceClose) {
            cardElement.classList.add('is-expanded');
            cardElement.setAttribute('aria-expanded', 'true');
            cardElement.querySelector('.card-details').setAttribute('aria-hidden', 'false');
            const closeBtn = cardElement.querySelector('.close-card');
            if (closeBtn) closeBtn.setAttribute('aria-hidden', 'false');
            // Scroll to the card if it's not fully in view. Add a small delay for CSS transition.
            setTimeout(() => {
                cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                // Move focus to close button for better accessibility
                const firstFocusable = cardElement.querySelector('.close-card, .action-button');
                if (firstFocusable) firstFocusable.focus();
            }, 100);
        } else if (isExpanded || forceClose) {
            cardElement.classList.remove('is-expanded');
            cardElement.setAttribute('aria-expanded', 'false');
            cardElement.querySelector('.card-details').setAttribute('aria-hidden', 'true');
            const closeBtn = cardElement.querySelector('.close-card');
            if (closeBtn) closeBtn.setAttribute('aria-hidden', 'true');
            // If the card was expanded and is now closed, ensure its title is visible
            cardElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            // Return focus to the card itself after closing
            cardElement.focus();
        }
    }

    /**
     * Adds event listeners to a given card element.
     * @param {HTMLElement} card - The card DOM element to attach listeners to.
     */
    function addCardEventListeners(card) {
        card.addEventListener('click', (event) => {
            // Prevent toggling if the click was on the close button or action button
            if (!event.target.closest('.close-card') && !event.target.closest('.action-button')) {
                toggleCard(card);
            }
        });

        card.addEventListener('keydown', (event) => {
            // Allow Enter/Space to toggle card, but prevent default behavior for spacebar
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleCard(card);
            }
        });

        const closeButton = card.querySelector('.close-card');
        if (closeButton) {
            closeButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent card from also toggling
                toggleCard(card, true); // Force close the card
            });
            closeButton.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    toggleCard(card, true);
                }
            });
        }
        // Prevent action button click from expanding/collapsing the card
        const actionButton = card.querySelector('.action-button');
        if (actionButton) {
            actionButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Stop propagation to prevent card toggle
                alert(`Action for "${card.querySelector('.card-title').textContent}"`);
                // For a real app, this would navigate or trigger a different action
            });
        }
    }

    /**
     * Renders cards based on the current filter and search criteria.
     */
    function renderCards() {
        // Close any expanded cards before re-rendering
        document.querySelectorAll('.expanding-card.is-expanded').forEach(c => toggleCard(c, true));

        carouselContainer.innerHTML = ''; // Clear existing cards
        const selectedCategory = categoryFilter.value;
        const searchTerm = searchInput.value.toLowerCase().trim();

        let filteredCards = allCards.filter(card => {
            const categoryMatch = selectedCategory === 'all' || card.category === selectedCategory;
            const searchMatch = !searchTerm ||
                                card.title.toLowerCase().includes(searchTerm) ||
                                card.excerpt.toLowerCase().includes(searchTerm) ||
                                card.details.toLowerCase().includes(searchTerm) ||
                                card.features.some(feature => feature.toLowerCase().includes(searchTerm)); // Search in features too
            return categoryMatch && searchMatch;
        });

        if (filteredCards.length > 0) {
            filteredCards.forEach(info => {
                const cardElement = createCardElement(info);
                carouselContainer.appendChild(cardElement);
            });
            searchAnnouncer.textContent = `${filteredCards.length} cards found.`;
        } else {
            carouselContainer.innerHTML = '<p class="no-results">No cards found matching your criteria.</p>';
            searchAnnouncer.textContent = 'No cards found.';
        }

        // After rendering, if there's a hash, try to expand the corresponding card
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetCard = carouselContainer.querySelector(`[data-id="${hash}"]`);
            if (targetCard) {
                // Remove the hash from URL to prevent re-triggering on subsequent renders
                history.replaceState(null, null, ' ');
                toggleCard(targetCard);
            }
        }
    }

    // Function to set view mode (grid or list)
    function setViewMode(mode) {
        if (mode === 'grid') {
            carouselContainer.classList.remove('list-view');
            carouselContainer.classList.add('grid-view');
            gridViewBtn.classList.add('active');
            gridViewBtn.setAttribute('aria-pressed', 'true');
            listViewBtn.classList.remove('active');
            listViewBtn.setAttribute('aria-pressed', 'false');
        } else { // list mode
            carouselContainer.classList.remove('grid-view');
            carouselContainer.classList.add('list-view');
            listViewBtn.classList.add('active');
            listViewBtn.setAttribute('aria-pressed', 'true');
            gridViewBtn.classList.remove('active');
            gridViewBtn.setAttribute('aria-pressed', 'false');
        }
        // No need to re-render all cards, just apply the class change.
        // We'll close expanded cards in renderCards if it's called by filter/search.
    }

    // --- Event Listeners ---
    categoryFilter.addEventListener('change', renderCards);
    searchInput.addEventListener('input', renderCards);
    gridViewBtn.addEventListener('click', () => setViewMode('grid'));
    listViewBtn.addEventListener('click', () => setViewMode('list'));

    // New: Smooth scroll for sidebar navigation links
    document.querySelectorAll('.sidebar nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // New: Smooth scroll for "Start Exploring" button
    startExploringBtn.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });

    // --- Initial Load Logic ---
    // Check URL parameter for initial category selection
    const urlParams = new URLSearchParams(window.location.search);
    const initialCategory = urlParams.get('category');
    if (initialCategory && ['nature', 'city'].includes(initialCategory)) {
        categoryFilter.value = initialCategory;
    }

    // Initial render of cards
    renderCards();
});