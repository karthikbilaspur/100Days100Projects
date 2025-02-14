// Get all FAQ toggle buttons
const faqToggles = document.querySelectorAll('.faq-toggle');

// Add event listener to each FAQ toggle button
faqToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
        // Get the parent FAQ element
        const faq = toggle.parentNode;

        // Toggle the active class on the FAQ element
        faq.classList.toggle('active');

        // Toggle the aria-expanded attribute on the FAQ toggle button
        toggle.ariaExpanded = toggle.ariaExpanded === 'true' ? 'false' : 'true';
    });
});

// Add event listener to the window object to handle keyboard navigation
window.addEventListener('keydown', (event) => {
    // Check if the Enter key or Spacebar key is pressed
    if (event.key === 'Enter' || event.key === ' ') {
        // Get the currently focused element
        const focusedElement = document.activeElement;

        // Check if the focused element is a FAQ toggle button
        if (focusedElement.classList.contains('faq-toggle')) {
            // Simulate a click event on the FAQ toggle button
focusedElement.click();
}
}
});