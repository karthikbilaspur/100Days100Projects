// --- DOM Element References ---
const registrationForm = document.getElementById('registration-form');
const loginForm = document.getElementById('login-form');
const forgotPasswordForm = document.getElementById('forgot-password-form');

const formTitle = document.getElementById('form-title');
const messageDisplay = document.querySelector('.messages'); // For general messages

const tabButtons = document.querySelectorAll('.tab-button');

// Registration Form Elements
const regUsernameInput = document.getElementById('username');
const regEmailInput = document.getElementById('email');
const regPasswordInput = document.getElementById('password');
const regConfirmPasswordInput = document.getElementById('confirm-password');
const regPasswordToggle = document.getElementById('reg-password-toggle'); // Added for visibility
const regConfirmPasswordToggle = document.getElementById('reg-confirm-password-toggle'); // Added for visibility

// Login Form Elements
const loginUsernameInput = document.getElementById('login-username');
const loginPasswordInput = document.getElementById('login-password');
const loginPasswordToggle = document.getElementById('login-password-toggle'); // Added for visibility

// Forgot Password Form Elements
const forgotUsernameInput = document.getElementById('forgot-username');

const forgotPasswordLink = document.getElementById('forgot-password-link');
const backToLoginLink = document.getElementById('back-to-login-link');

// --- Utility Functions ---

/**
 * Displays a message to the user.
 * @param {string} message - The message text.
 * @param {string} type - The type of message ('success', 'error', 'info').
 */
function showMessage(message, type = 'info') {
    messageDisplay.textContent = message;
    messageDisplay.className = `messages ${type}`; // Add type class for styling
    messageDisplay.style.display = 'block';
    setTimeout(() => {
        messageDisplay.style.display = 'none';
        messageDisplay.textContent = '';
    }, 5000); // Message disappears after 5 seconds
}

/**
 * Displays an error message next to a specific input field.
 * @param {HTMLElement} inputElement - The input field where the error occurred.
 * @param {string} message - The error message to display.
 */
function showInputError(inputElement, message) {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        inputElement.classList.add('input-error'); // Add error class for styling
    }
}

/**
 * Clears an error message for a specific input field.
 * @param {HTMLElement} inputElement - The input field to clear the error for.
 */
function clearInputError(inputElement) {
    const errorElement = document.getElementById(`${inputElement.id}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        inputElement.classList.remove('input-error');
    }
}

/**
 * Toggles the visibility of a password input field.
 * @param {HTMLInputElement} passwordInput - The password input field.
 * @param {HTMLElement} toggleButton - The button that triggers the toggle.
 */
function togglePasswordVisibility(passwordInput, toggleButton) {
    const type = passwordInput.getAttribute('type') === 'password'? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    toggleButton.classList.toggle('visible'); // For styling eye icon
}

// --- Form Switching Logic ---
/**
 * Switches the active form based on the button clicked.
 * @param {string} formId - The ID of the form to show.
 * @param {string} title - The title to set for the form header.
 */
function switchForm(formId, title) {
    // Hide all forms
    registrationForm.style.display = 'none';
    loginForm.style.display = 'none';
    forgotPasswordForm.style.display = 'none';

    // Remove active class from all buttons
    tabButtons.forEach(button => button.classList.remove('active'));

    // Show the selected form
    document.getElementById(formId).style.display = 'block';
    formTitle.textContent = title;

    // Set active class on the corresponding tab button
    const activeTabButton = document.querySelector(`.tab-button[data-form="${formId}"]`);
    if (activeTabButton) {
        activeTabButton.classList.add('active');
    }

    // Clear any previous messages
    showMessage('');
    messageDisplay.style.display = 'none';
}

// Initial form state (show registration by default)
document.addEventListener('DOMContentLoaded', () => {
    switchForm('registration-form', 'Registration Form');
});

// --- Event Listeners for Form Switching ---

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const formId = button.dataset.form;
        let title = '';
        switch (formId) {
            case 'registration-form':
                title = 'Registration Form';
                break;
            case 'login-form':
                title = 'Login Form';
                break;
            case 'forgot-password-form':
                title = 'Forgot Password';
                break;
        }
        switchForm(formId, title);
    });
});

forgotPasswordLink.addEventListener('click', () => {
    switchForm('forgot-password-form', 'Forgot Password');
});

backToLoginLink.addEventListener('click', () => {
    switchForm('login-form', 'Login Form');
});

// --- Input Validation ---

/**
 * Validates the registration form fields.
 * @returns {boolean} True if all fields are valid, false otherwise.
 */
function validateRegistrationForm() {
    let isValid = true;

    // Clear previous errors
    clearInputError(regUsernameInput);
    clearInputError(regEmailInput);
    clearInputError(regPasswordInput);
    clearInputError(regConfirmPasswordInput);

    // Username validation
    if (regUsernameInput.value.trim().length < 3) {
        showInputError(regUsernameInput, 'Username must be at least 3 characters.');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmailInput.value.trim())) {
        showInputError(regEmailInput, 'Please enter a valid email address.');
        isValid = false;
    }

    // Password validation (simple example: 6 chars min)
    if (regPasswordInput.value.length < 6) {
        showInputError(regPasswordInput, 'Password must be at least 6 characters.');
        isValid = false;
    }

    // Confirm Password validation
    if (regPasswordInput.value!== regConfirmPasswordInput.value) {
        showInputError(regConfirmPasswordInput, 'Passwords do not match.');
        isValid = false;
    }

    return isValid;
}

/**
 * Validates the login form fields.
 * @returns {boolean} True if all fields are valid, false otherwise.
 */
function validateLoginForm() {
    let isValid = true;

    clearInputError(loginUsernameInput);
    clearInputError(loginPasswordInput);

    if (loginUsernameInput.value.trim() === '') {
        showInputError(loginUsernameInput, 'Username cannot be empty.');
        isValid = false;
    }
    if (loginPasswordInput.value.trim() === '') {
        showInputError(loginPasswordInput, 'Password cannot be empty.');
        isValid = false;
    }

    return isValid;
}

/**
 * Validates the forgot password form fields.
 * @returns {boolean} True if the field is valid, false otherwise.
 */
function validateForgotPasswordForm() {
    let isValid = true;

    clearInputError(forgotUsernameInput);

    if (forgotUsernameInput.value.trim() === '') {
        showInputError(forgotUsernameInput, 'Username cannot be empty.');
        isValid = false;
    }
    return isValid;
}

// --- Form Submission Handlers ---

registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (!validateRegistrationForm()) {
        showMessage('Please correct the errors in the registration form.', 'error');
        return;
    }

    const username = regUsernameInput.value.trim();
    const email = regEmailInput.value.trim();
    const password = regPasswordInput.value;

    const user = { username, email, password };
    localStorage.setItem('user', JSON.stringify(user));

    showMessage('Registration successful! You can now log in.', 'success');
    // Optionally clear form fields
    registrationForm.reset();
    // Switch to login form after successful registration
    switchForm('login-form', 'Login Form');

    // Update graph data after a successful action
    updateChartData('registrations');
});

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (!validateLoginForm()) {
        showMessage('Please enter your username and password.', 'error');
        return;
    }

    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value;

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && username === storedUser.username && password === storedUser.password) {
        showMessage(`Welcome back, ${username}! Login successful.`, 'success');
        loginForm.reset();
        // Here you would typically redirect to a dashboard or main app page
        // window.location.href = '/dashboard.html';

        // Update graph data after a successful action
        updateChartData('logins');
    } else {
        showMessage('Invalid username or password. Please try again.', 'error');
        showInputError(loginUsernameInput, 'Invalid credentials.');
        showInputError(loginPasswordInput, 'Invalid credentials.');
        updateChartData('failedLogins');
    }
});

forgotPasswordForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (!validateForgotPasswordForm()) {
        showMessage('Please enter your username.', 'error');
        return;
    }

    const username = forgotUsernameInput.value.trim();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && username === storedUser.username) {
        // In a real app, you'd send an email with a reset link here.
        showMessage(`Password reset instructions sent to ${storedUser.email} (simulated).`, 'success');
        forgotPasswordForm.reset();
        switchForm('login-form', 'Login Form'); // Go back to login after "reset"
        updateChartData('passwordResets');
    } else {
        showMessage('Username not found.', 'error');
        showInputError(forgotUsernameInput, 'No user with this username.');
    }
});

// --- Password Visibility Toggle ---
// Find the toggles AFTER the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Dynamically create password toggles for demonstration.
    // In a real scenario, you'd likely have these icons in your HTML.
    addPasswordToggle(regPasswordInput);
    addPasswordToggle(regConfirmPasswordInput);
    addPasswordToggle(loginPasswordInput);
});

function addPasswordToggle(inputElement) {
    if (!inputElement) return; // Guard against null elements

    const wrapper = inputElement.parentElement; // Assuming input is in a form-group
    const toggle = document.createElement('span');
    toggle.className = 'password-toggle-icon';
    toggle.innerHTML = '&#128065;'; // Eye icon unicode
    toggle.setAttribute('aria-label', 'Toggle password visibility');
    toggle.setAttribute('role', 'button');
    toggle.setAttribute('tabindex', '0'); // Make it focusable

    wrapper.appendChild(toggle);

    toggle.addEventListener('click', () => togglePasswordVisibility(inputElement, toggle));
    toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            togglePasswordVisibility(inputElement, toggle);
        }
    });
}

// --- Graph (Chart.js) Integration ---

let userActivityChart; // Declare chart variable globally

// Initial data for the chart (can be loaded from localStorage or API)
let chartData = JSON.parse(localStorage.getItem('userActivityData')) || {
    labels: ['Registrations', 'Logins', 'Failed Logins', 'Password Resets'],
    datasets: [{
        label: 'Activity Count',
        data: [0, 0, 0, 0], // Initial counts
        backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 205, 86, 0.6)'
        ],
        borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 205, 86, 1)'
        ],
        borderWidth: 1
    }]
};

/**
 * Initializes the Chart.js graph.
 */
function initChart() {
    const ctx = document.getElementById('activityChart');

    if (ctx) {
        userActivityChart = new Chart(ctx, {
            type: 'bar', // Can be 'pie', 'line', 'doughnut', etc.
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false, // Allows chart to resize freely
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0 // Ensure whole numbers for counts
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // We only have one dataset
                    },
                    title: {
                        display: true,
                        text: 'User Activity Overview (Session Data)',
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    }
}

/**
 * Updates the chart data based on user actions.
 * @param {string} activityType - The type of activity ('registrations', 'logins', 'failedLogins', 'passwordResets').
 */
function updateChartData(activityType) {
    let index = -1;
    switch (activityType) {
        case 'registrations': index = 0; break;
        case 'logins': index = 1; break;
        case 'failedLogins': index = 2; break;
        case 'passwordResets': index = 3; break;
    }

    if (index!== -1) {
        chartData.datasets[0].data[index]++;
        if (userActivityChart) {
            userActivityChart.update(); // Redraw the chart
            localStorage.setItem('userActivityData', JSON.stringify(chartData)); // Save updated data
        }
    }
}

// Initialize the chart when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initChart);