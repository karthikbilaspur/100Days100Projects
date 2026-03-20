// Initial counter data
const initialCountersData = [
    { icon: 'twitter', target: 12000, label: 'Followers' },
    { icon: 'youtube', target: 5000, label: 'Subscribers' },
    { icon: 'facebook', target: 7500, label: 'Likes' },
    { icon: 'github', target: 200, label: 'Projects' }
];

let allCounters = [...initialCountersData]; // Use a mutable copy for adding new counters

// Function to render counters using Handlebars
function renderCounters() {
    try {
        const source = document.getElementById('counter-template').innerHTML;
        const template = Handlebars.compile(source);
        const html = template({ counters: allCounters });
        document.getElementById('counters-display').innerHTML = html;
        initializeCounters(); // Re-initialize counters after rendering
    } catch (error) {
        handleError('Failed to render counters: ' + error.message);
    }
}

// Function to initialize all counter animations
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.innerText = '0'; // Reset for re-initialization
        const target = +counter.getAttribute('data-target');
        const duration = +counter.getAttribute('data-duration') || 2000; // Default duration to 2 seconds
        let startTimestamp = null;

        const animateCounter = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;
            const percentage = Math.min(progress / duration, 1);
            const currentValue = Math.floor(percentage * target);

            counter.innerText = formatNumber(currentValue);

            if (percentage < 1) {
                requestAnimationFrame(animateCounter);
            } else {
                counter.innerText = formatNumber(target); // Ensure it ends exactly on target
            }
        };

        requestAnimationFrame(animateCounter);
    });
}

// Helper function to format numbers (e.g., add commas)
function formatNumber(num) {
    return num.toLocaleString();
}

// Function to handle errors
function handleError(message) {
    console.error('Error:', message);
    const errorMessageElement = document.createElement('div');
    errorMessageElement.className = 'error-message';
    errorMessageElement.textContent = 'An error occurred: ' + message;
    document.body.prepend(errorMessageElement); // Show error at the top of the body
    setTimeout(() => errorMessageElement.remove(), 5000); // Remove after 5 seconds
}

// Event listener for adding new counters
document.getElementById('add-counter-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const iconInput = document.getElementById('icon-input');
    const targetInput = document.getElementById('target-input');
    const labelInput = document.getElementById('label-input');

    const newCounter = {
        icon: iconInput.value.trim(),
        target: parseInt(targetInput.value, 10),
        label: labelInput.value.trim()
    };

    if (newCounter.icon && !isNaN(newCounter.target) && newCounter.target > 0 && newCounter.label) {
        allCounters.push(newCounter);
        renderCounters(); // Re-render all counters including the new one
        this.reset(); // Clear form fields
    } else {
        handleError('Please fill all fields correctly for the new counter.');
    }
});

// Initial render when the page loads
document.addEventListener('DOMContentLoaded', renderCounters);

// Global error handler for unexpected errors
window.onerror = function(message, source, lineno, colno, error) {
    handleError(`Script Error: ${message} at ${source}:${lineno}`);
    return true; // Suppress default browser error handling
};