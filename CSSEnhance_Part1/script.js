document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('mega-preloader');
    const mainContent = document.getElementById('main-content');
    const body = document.body;
    const loadingTextElement = document.getElementById('loading-text');
    const progressBar = document.getElementById('loading-progress-bar');

    const loadingMessages = [
        "Initializing systems...",
        "Calibrating circuits...",
        "Fetching data stream...",
        "Assembling modules...",
        "Optimizing display...",
        "Almost there!",
        "Content ready."
    ];
    let messageIndex = 0;
    let progress = 0;

    // Function to update loading text and progress bar
    const updateLoader = () => {
        if (messageIndex < loadingMessages.length) {
            const currentMessage = loadingMessages[messageIndex];
            let charIndex = 0;
            loadingTextElement.textContent = ""; // Clear previous text

            // Typewriter effect for text
            const typeText = () => {
                if (charIndex < currentMessage.length) {
                    loadingTextElement.textContent += currentMessage.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeText, 50); // Typing speed
                } else {
                    // Once message is typed, update progress bar
                    progress += Math.floor(100 / loadingMessages.length);
                    progressBar.style.width = `${Math.min(progress, 100)}%`;
                    messageIndex++;
                    // After a short delay, update next message
                    if (messageIndex < loadingMessages.length) {
                        setTimeout(updateLoader, 800); // Delay before next message
                    } else {
                        // All messages shown, content is "ready"
                        setTimeout(hidePreloader, 500);
                    }
                }
            };
            typeText();
        }
    };

    const hidePreloader = () => {
        preloader.classList.add('hidden');
        preloader.setAttribute('aria-hidden', 'true'); // Announce it's hidden for screen readers

        // Once the preloader transition ends, remove it from DOM and show main content
        preloader.addEventListener('transitionend', () => {
            preloader.remove(); // Remove preloader from DOM
            body.classList.remove('overflow-hidden'); // Allow body scrolling
            mainContent.classList.add('visible'); // Make main content visible

            // Since we're using animate.css, these classes will trigger animations
            // We just need to make sure the elements are initially hidden (opacity:0 or visibility:hidden)
            // and then animate.css takes over when they become part of the visible DOM flow.
            // The `animate__animated` and `animate__delay-Xs` classes handle the timing.
        }, { once: true });
    };

    // Start the loading simulation
    updateLoader();
});