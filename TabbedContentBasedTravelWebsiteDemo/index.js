import auth from './auth.js';
import reviews from './reviews.js';
import bookings from './bookings.js';

// Login and registration
const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    if (auth.login(username, password)) {
        // Login successful, redirect to dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Login failed, display error message
        alert('Invalid username or password');
    }
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = registerForm.username.value;
    const password = registerForm.password.value;
    auth.register(username, password);
    // Registration successful, redirect to login page
    window.location.href = 'login.html';
});

// Destination reviews
const reviewForm = document.querySelector('#review-form');

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const destinationId = reviewForm.destinationId.value;
    const review = reviewForm.review.value;
    reviews.addReview(destinationId, review);
    // Review added successfully, display success message
    alert('Review added successfully');
});

// Bookings
const bookingForm = document.querySelector('#booking-form');

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const destinationId = bookingForm.destinationId.value;
    const userId = auth.getCurrentUser().id;
    bookings.bookDestination(destinationId, userId);
    // Booking successful, display success message
    alert('Booking successful');
});