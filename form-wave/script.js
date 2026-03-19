// --- DOM Elements ---
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const formControls = document.querySelectorAll('.form-control');
const loginButton = document.querySelector('.btn[type="submit"]');

// --- Error/Hint Message Elements ---
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const emailHint = document.getElementById('email-hint');
const passwordHint = document.getElementById('password-hint');

// --- Global State ---
let isSubmitting = false; // To prevent multiple submissions

// --- Utility Functions ---

/**
 * Displays an error message for a specific input field.
 * @param {HTMLElement} inputElement - The input field.
 * @param {HTMLElement} errorElement - The corresponding error message div.
 * @param {string} message - The error message to display.
 */
function showError(inputElement, errorElement, message) {
    inputElement.classList.add('invalid');
    errorElement.textContent = message;
    errorElement.style.display = 'block'; // Make visible
    inputElement.setAttribute('aria-invalid', 'true');
    inputElement.setAttribute('aria-describedby', `${errorElement.id}`); // Link error for screen readers
}

/**
 * Clears the error message for a specific input field.
 * @param {HTMLElement} inputElement - The input field.
 * @param {HTMLElement} errorElement - The corresponding error message div.
 */
function clearError(inputElement, errorElement) {
    inputElement.classList.remove('invalid');
    errorElement.textContent = '';
    errorElement.style.display = 'none'; // Hide
    inputElement.removeAttribute('aria-invalid');
    inputElement.removeAttribute('aria-describedby'); // Remove link to error
    // Re-link to hint if it exists
    const hintElement = document.getElementById(`${inputElement.id}-hint`);
    if (hintElement && hintElement.textContent) {
        inputElement.setAttribute('aria-describedby', hintElement.id);
    }
}

/**
 * Validates email format using a simple regex.
 * @param {string} email - The email string to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
function isValidEmail(email) {
    // A simple regex for basic email validation. For strict validation, use a more comprehensive one.
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// --- Form Validation Logic ---

/**
 * Performs real-time validation for the email input.
 */
function validateEmail() {
    const email = emailInput.value.trim();
    if (email === '') {
        showError(emailInput, emailError, 'Email cannot be empty.');
        return false;
    } else if (!isValidEmail(email)) {
        showError(emailInput, emailError, 'Please enter a valid email address.');
        return false;
    } else {
        clearError(emailInput, emailError);
        return true;
    }
}

/**
 * Performs real-time validation for the password input.
 */
function validatePassword() {
    const password = passwordInput.value.trim();
    if (password === '') {
        showError(passwordInput, passwordError, 'Password cannot be empty.');
        return false;
    } else if (password.length < 8) { // Example: minimum 8 characters
        showError(passwordInput, passwordError, 'Password must be at least 8 characters long.');
        return false;
    } else {
        clearError(passwordInput, passwordError);
        return true;
    }
}

/**
 * Performs full form validation before submission.
 * @returns {boolean} - True if form is valid, false otherwise.
 */
function validateForm() {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    return isEmailValid && isPasswordValid;
}

// --- Label Wave Effect ---

/**
 * Handles the "wave" label animation based on input focus/blur and content.
 */
function handleLabelWaveEffect() {
    formControls.forEach(formControl => {
        const input = formControl.querySelector('input');
        const label = formControl.querySelector('label');
        if (!input || !label) return; // Guard against missing elements

        // Initialize label position if input has a value (e.g., browser autocomplete)
        if (input.value !== '') {
            label.classList.add('active-label');
        } else {
            label.classList.remove('active-label');
        }

        input.addEventListener('focus', () => {
            label.classList.add('active-label');
        });

        input.addEventListener('blur', () => {
            if (input.value === '') {
                label.classList.remove('active-label');
            }
        });
    });
}

// --- Toggle Password Visibility ---

/**
 * Adds a toggle button to password fields to show/hide content.
 */
function addPasswordToggle() {
    const passwordFields = document.querySelectorAll('input[type="password"]');
    passwordFields.forEach(passwordField => {
        const wrapper = passwordField.closest('.form-control');
        if (!wrapper) return;

        const toggleButton = document.createElement('button');
        toggleButton.setAttribute('type', 'button');
        toggleButton.setAttribute('aria-label', 'Show password');
        toggleButton.classList.add('password-toggle');
        toggleButton.innerHTML = '<i class="far fa-eye"></i>'; // Font Awesome eye icon

        toggleButton.addEventListener('click', () => {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            toggleButton.innerHTML = type === 'password' ? '<i class="far fa-eye"></i>' : '<i class="far fa-eye-slash"></i>';
            toggleButton.setAttribute('aria-label', type === 'password' ? 'Show password' : 'Hide password');
            passwordField.focus(); // Keep focus on the input
        });

        wrapper.appendChild(toggleButton); // Append inside the form-control
    });
}

// --- Simulated Backend (for demonstration) ---
/**
 * Simulates a backend login request.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} - A promise that resolves with user data or rejects with an error.
 */
function simulateBackendLogin(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => { // Simulate network delay
            if (email === 'test@example.com' && password === 'Password123!') {
                resolve({
                    success: true,
                    message: 'Login successful!',
                    user: {
                        username: 'TestUser',
                        id: '12345'
                    }
                });
            } else if (email === 'locked@example.com') {
                reject({
                    success: false,
                    message: 'Account locked. Please contact support.'
                });
            } else {
                reject({
                    success: false,
                    message: 'Invalid email or password.'
                });
            }
        }, 1500); // 1.5 second delay
    });
}

// --- Event Listeners ---

// Real-time validation on input
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);

// Form submission handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (isSubmitting) return; // Prevent double submission

    if (!validateForm()) {
        // If validation fails, focus on the first invalid field
        const firstInvalid = document.querySelector('.invalid');
        if (firstInvalid) {
            firstInvalid.focus();
        }
        return;
    }

    // Set button to loading state
    isSubmitting = true;
    const originalButtonText = loginButton.textContent;
    loginButton.textContent = 'Logging in...';
    loginButton.disabled = true; // Disable button
    loginButton.setAttribute('aria-busy', 'true'); // Announce busy state for screen readers

    try {
        const response = await simulateBackendLogin(emailInput.value, passwordInput.value);
        if (response.success) {
            alert(`Login successful! Welcome, ${response.user.username}`);
            // In a real app, you'd redirect or update the UI
            loginForm.reset(); // Clear form
            handleLabelWaveEffect(); // Reset label positions
        } else {
            alert(`Login failed: ${response.message}`);
        }
    } catch (error) {
        alert(`An error occurred: ${error.message || 'Please try again later.'}`);
        console.error('Login error:', error);
    } finally {
        // Reset button state
        isSubmitting = false;
        loginButton.textContent = originalButtonText;
        loginButton.disabled = false;
        loginButton.removeAttribute('aria-busy');
    }
});

// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    handleLabelWaveEffect();
    addPasswordToggle();

    // Re-evaluate label positions and clear errors if user navigates back
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            handleLabelWaveEffect();
            // Clear any lingering error messages if user navigates back
            clearError(emailInput, emailError);
            clearError(passwordInput, passwordError);
        }
    });

    // Set initial aria-describedby for hints
    if (emailHint.textContent) {
        emailInput.setAttribute('aria-describedby', emailHint.id);
    }
    if (passwordHint.textContent) {
        passwordInput.setAttribute('aria-describedby', passwordHint.id);
    }
});