// Get all rating elements
const ratings = document.querySelectorAll('.rating');

// Get the ratings container element
const ratingsContainer = document.querySelector('.ratings-container');

// Get the send review button element
const sendBtn = document.querySelector('#send');

// Get the panel element
const panel = document.querySelector('#panel');

// Initialize the selected rating variable
let selectedRating = 'Satisfied';

// Add event listener to the ratings container
ratingsContainer.addEventListener('click', (e) => {
    // Check if the clicked element is a rating element
    if (e.target.parentNode.classList.contains('rating') && e.target.nextElementSibling) {
        // Remove the active class from all rating elements
        removeActive();
        // Add the active class to the clicked rating element
        e.target.parentNode.classList.add('active');
        // Update the selected rating variable
        selectedRating = e.target.nextElementSibling.innerHTML;
    } else if (
        e.target.parentNode.classList.contains('rating') &&
        e.target.previousSibling &&
        e.target.previousElementSibling.nodeName === 'IMG'
    ) {
        // Remove the active class from all rating elements
        removeActive();
        // Add the active class to the clicked rating element
        e.target.parentNode.classList.add('active');
        // Update the selected rating variable
        selectedRating = e.target.innerHTML;
    }
});

// Add event listener to the send review button
sendBtn.addEventListener('click', (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Update the panel content with the selected rating
    panel.innerHTML = `
        <i class="fas fa-heart"></i>
        <strong>Thank You!</strong>
        <br>
        <strong>Feedback: ${selectedRating}</strong>
        <p>We'll use your feedback to improve our customer support</p>
    `;
});

// Function to remove the active class from all rating elements
function removeActive() {
    for (let i = 0; i < ratings.length; i++) {
        ratings[i].classList.remove('active');
    }
}

// Function to handle errors
function handleError(error) {
    console.error('Error:', error);
    // Display an error message to the user
    panel.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <strong>Error!</strong>
        <br>
        <p>An error occurred while processing your feedback. Please try again later.</p>
    `;
}