// --- DOM Elements ---
const registrationForm = document.getElementById('registrationForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const dobInput = document.getElementById('dob');
const countrySelect = document.getElementById('country');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const termsCheckbox = document.getElementById('terms');
const submitButton = document.querySelector('.btn[type="submit"]');

// Error/Hint Message Elements
const usernameError = document.getElementById('username-error');
const emailError = document.getElementById('email-error');
const dobError = document.getElementById('dob-error');
const countryError = document.getElementById('country-error');
const passwordError = document.getElementById('password-error');
const confirmPasswordError = document.getElementById('confirm-password-error');
const termsError = document.getElementById('terms-error');
const generalError = document.getElementById('general-error');

// Password Strength Indicator Elements
const passwordStrengthIndicator = document.getElementById('password-strength-indicator');
const strengthBar = passwordStrengthIndicator.querySelector('.strength-bar');
const strengthLabel = passwordStrengthIndicator.querySelector('.strength-label');

// --- Global State ---
let isSubmitting = false;

// --- Utility Functions ---

/**
 * Displays an error message for a specific input field.
 * @param {HTMLElement} inputElement - The input field (or checkbox/select).
 * @param {HTMLElement} errorElement - The corresponding error message div.
 * @param {string} message - The error message to display.
 */
function showError(inputElement, errorElement, message) {
    if (inputElement.type === 'checkbox') {
        inputElement.classList.add('invalid');
        errorElement.classList.add('invalid'); // Highlight the checkbox group
    } else {
        inputElement.classList.add('invalid');
    }
    errorElement.textContent = message;
    errorElement.style.visibility = 'visible'; // Make visible
    errorElement.style.opacity = '1';
    inputElement.setAttribute('aria-invalid', 'true');
    inputElement.setAttribute('aria-describedby', `${errorElement.id}`); // Link error for screen readers
}

/**
 * Clears the error message for a specific input field.
 * @param {HTMLElement} inputElement - The input field (or checkbox/select).
 * @param {HTMLElement} errorElement - The corresponding error message div.
 */
function clearError(inputElement, errorElement) {
    if (inputElement.type === 'checkbox') {
        inputElement.classList.remove('invalid');
        errorElement.classList.remove('invalid');
    } else {
        inputElement.classList.remove('invalid');
    }
    errorElement.textContent = '';
    errorElement.style.visibility = 'hidden'; // Hide visually
    errorElement.style.opacity = '0';
    inputElement.removeAttribute('aria-invalid');
    // Restore original aria-describedby if hints are present
    const hintElement = document.getElementById(`${inputElement.id}-hint`);
    if (hintElement && hintElement.textContent) {
        inputElement.setAttribute('aria-describedby', hintElement.id);
    } else {
        inputElement.removeAttribute('aria-describedby');
    }
}

/**
 * Validates email format using a more robust regex.
 * @param {string} email - The email string to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

/**
 * Validates username format.
 * @param {string} username - The username string to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
function isValidUsername(username) {
    return /^[a-zA-Z0-9_]{4,20}$/.test(username);
}

/**
 * Calculates password strength.
 * @param {string} password - The password string.
 * @returns {object} - An object with score (0-100) and strength level.
 */
function checkPasswordStrength(password) {
    let score = 0;
    const requirements = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };

    if (requirements.length) score += 20;
    if (requirements.uppercase) score += 20;
    if (requirements.lowercase) score += 20;
    if (requirements.number) score += 20;
    if (requirements.specialChar) score += 20;

    let strength = 'Very Weak';
    if (score >= 80) strength = 'Very Strong';
    else if (score >= 60) strength = 'Strong';
    else if (score >= 40) strength = 'Medium';
    else if (score >= 20) strength = 'Weak';

    return { score, strength, requirements };
}

/**
 * Updates the password strength indicator visually and for screen readers.
 * @param {string} password - The current password value.
 */
function updatePasswordStrengthIndicator(password) {
    if (password.length === 0) {
        strengthBar.style.width = '0%';
        strengthBar.className = 'strength-bar'; // Reset classes
        strengthLabel.textContent = 'Password Strength: Empty';
        passwordStrengthIndicator.setAttribute('aria-valuenow', '0');
        return;
    }

    const { score, strength } = checkPasswordStrength(password);
    strengthBar.style.width = `${score}%`;
    strengthBar.className = 'strength-bar'; // Reset classes
    strengthLabel.textContent = `Password Strength: ${strength}`;
    passwordStrengthIndicator.setAttribute('aria-valuenow', score);

    if (score < 40) strengthBar.classList.add('weak');
    else if (score < 60) strengthBar.classList.add('medium');
    else if (score < 80) strengthBar.classList.add('strong');
    else strengthBar.classList.add('very-strong');
}

/**
 * Checks if the user is at least 13 years old.
 * @param {string} dobString - Date of birth in YYYY-MM-DD format.
 * @returns {boolean} - True if 13 or older, false otherwise.
 */
function isAtLeast13YearsOld(dobString) {
    if (!dobString) return false;
    const dob = new Date(dobString);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        return age - 1 >= 13;
    }
    return age >= 13;
}

// --- Form Field Validation Logic ---

function validateUsernameField() {
    const username = usernameInput.value.trim();
    if (username === '') {
        showError(usernameInput, usernameError, 'Username is required.');
        return false;
    } else if (!isValidUsername(username)) {
        showError(usernameInput, usernameError, 'Username must be 4-20 alphanumeric characters or underscores.');
        return false;
    } else {
        clearError(usernameInput, usernameError);
        return true;
    }
}

function validateEmailField() {
    const email = emailInput.value.trim();
    if (email === '') {
        showError(emailInput, emailError, 'Email is required.');
        return false;
    } else if (!isValidEmail(email)) {
        showError(emailInput, emailError, 'Please enter a valid email address.');
        return false;
    } else {
        clearError(emailInput, emailError);
        return true;
    }
}

function validateDobField() {
    const dob = dobInput.value.trim();
    if (dob === '') {
        showError(dobInput, dobError, 'Date of Birth is required.');
        return false;
    } else if (!isAtLeast13YearsOld(dob)) {
        showError(dobInput, dobError, 'You must be at least 13 years old.');
        return false;
    } else {
        clearError(dobInput, dobError);
        return true;
    }
}

function validateCountryField() {
    const country = countrySelect.value;
    if (country === '') {
        showError(countrySelect, countryError, 'Please select your country.');
        return false;
    } else {
        clearError(countrySelect, countryError);
        return true;
    }
}

function validatePasswordField() {
    const password = passwordInput.value;
    const { score, strength, requirements } = checkPasswordStrength(password);

    if (password === '') {
        showError(passwordInput, passwordError, 'Password is required.');
        return false;
    } else if (score < 80) { // Require at least "Strong" password
        let message = 'Password is not strong enough: ';
        const missing = [];
        if (!requirements.length) missing.push('at least 8 characters');
        if (!requirements.uppercase) missing.push('an uppercase letter');
        if (!requirements.lowercase) missing.push('a lowercase letter');
        if (!requirements.number) missing.push('a number');
        if (!requirements.specialChar) missing.push('a special character');
        showError(passwordInput, passwordError, message + missing.join(', ') + '.');
        return false;
    } else {
        clearError(passwordInput, passwordError);
        return true;
    }
}

function validateConfirmPasswordField() {
    const confirmPassword = confirmPasswordInput.value;
    const password = passwordInput.value;

    if (confirmPassword === '') {
        showError(confirmPasswordInput, confirmPasswordError, 'Confirm password is required.');
        return false;
    } else if (confirmPassword !== password) {
        showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match.');
        return false;
    } else {
        clearError(confirmPasswordInput, confirmPasswordError);
        return true;
    }
}

function validateTermsField() {
    if (!termsCheckbox.checked) {
        showError(termsCheckbox, termsError, 'You must agree to the Terms and Privacy Policy.');
        return false;
    } else {
        clearError(termsCheckbox, termsError);
        return true;
    }
}

/**
 * Performs full form validation before submission.
 * @returns {boolean} - True if form is valid, false otherwise.
 */
function validateForm() {
    // Run all validations and store results
    const isUsernameValid = validateUsernameField();
    const isEmailValid = validateEmailField();
    const isDobValid = validateDobField();
    const isCountryValid = validateCountryField();
    const isPasswordValid = validatePasswordField();
    const isConfirmPasswordValid = validateConfirmPasswordField();
    const isTermsValid = validateTermsField();

    // Return true only if ALL are valid
    return isUsernameValid && isEmailValid && isDobValid && isCountryValid && isPasswordValid && isConfirmPasswordValid && isTermsValid;
}

// --- Label Wave Effect ---

/**
 * Handles the "wave" label animation for text/email/password inputs based on input focus/blur and content.
 */
function handleLabelWaveEffect() {
    formControls.forEach(formGroup => {
        // Skip checkbox groups as they don't use this effect
        if (formGroup.classList.contains('checkbox-group')) return;

        const input = formGroup.querySelector('input:not([type="checkbox"]), select, textarea');
        const label = formGroup.querySelector('label');
        if (!input || !label) return;

        // Initialize label position if input has a value (e.g., browser autocomplete or pre-filled)
        if (input.value !== '' && input.value !== input.querySelector('option[value=""]')?.value) { // For select, check if not default option
            label.classList.add('active-label');
        } else {
            label.classList.remove('active-label');
        }

        input.addEventListener('focus', () => {
            label.classList.add('active-label');
        });

        input.addEventListener('blur', () => {
            if (input.value === '' || (input.tagName === 'SELECT' && input.value === input.querySelector('option[value=""]')?.value)) {
                label.classList.remove('active-label');
            }
        });
    });
}

// --- Toggle Password Visibility ---

/**
 * Adds event listeners to password toggle buttons.
 */
function setupPasswordToggles() {
    const passwordToggleButtons = document.querySelectorAll('.password-toggle');
    passwordToggleButtons.forEach(toggleButton => {
        const passwordField = toggleButton.previousElementSibling; // The input field is right before the button
        if (!passwordField || passwordField.type !== 'password') return;

        toggleButton.addEventListener('click', () => {
            const isPassword = passwordField.type === 'password';
            passwordField.type = isPassword ? 'text' : 'password';
            toggleButton.innerHTML = isPassword ? '<i class="far fa-eye-slash"></i>' : '<i class="far fa-eye"></i>';
            toggleButton.setAttribute('aria-label', isPassword ? `Hide ${passwordField.id}` : `Show ${passwordField.id}`);
            passwordField.focus(); // Keep focus on the input
        });
    });
}

// --- Simulated Backend for Registration ---
/**
 * Simulates a backend registration request.
 * @param {object} formData - Object containing form data.
 * @returns {Promise<object>} - A promise that resolves with success or rejects with an error.
 */
function simulateBackendRegistration(formData) {
    console.log("Simulating backend registration with:", formData);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate network delay and different backend responses
            if (formData.username === 'existing_user') {
                reject({ success: false, message: 'Username already taken.' });
            } else if (formData.email === 'existing@example.com') {
                reject({ success: false, message: 'Email address already registered.' });
            } else if (Math.random() < 0.1) { // 10% chance of a generic server error
                reject({ success: false, message: 'A server error occurred. Please try again.' });
            } else {
                resolve({ success: true, message: 'Registration successful!', userId: 'new_user_123' });
            }
        }, 2000); // 2 second delay
    });
}

// --- Event Listeners ---

// Real-time validation on input/change
usernameInput.addEventListener('input', validateUsernameField);
emailInput.addEventListener('input', validateEmailField);
dobInput.addEventListener('change', validateDobField); // 'change' for date pickers
countrySelect.addEventListener('change', validateCountryField);
passwordInput.addEventListener('input', () => {
    validatePasswordField();
    updatePasswordStrengthIndicator(passwordInput.value);
    // Re-validate confirm password if password changes
    if (confirmPasswordInput.value !== '') {
        validateConfirmPasswordField();
    }
});
confirmPasswordInput.addEventListener('input', validateConfirmPasswordField);
termsCheckbox.addEventListener('change', validateTermsField);

// Form submission handler
registrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent double submission

    generalError.style.display = 'none'; // Hide any previous general errors

    if (!validateForm()) {
        // If validation fails, focus on the first invalid field
        const firstInvalid = document.querySelector('.invalid:not(.error-message)'); // Exclude the error messages themselves
        if (firstInvalid) {
            firstInvalid.focus();
        }
        generalError.textContent = 'Please correct the errors in the form.';
        generalError.style.display = 'block';
        return;
    }

    // Prepare form data
    const formData = {
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        dob: dobInput.value.trim(),
        country: countrySelect.value,
        password: passwordInput.value,
        termsAccepted: termsCheckbox.checked
    };

    // Set button to loading state
    isSubmitting = true;
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Registering...';
    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');

    try {
        const response = await simulateBackendRegistration(formData);
        if (response.success) {
            alert(`Registration successful! Welcome, ${formData.username}`);
            registrationForm.reset(); // Clear form
            // Reset all errors and success states
            [usernameInput, emailInput, dobInput, countrySelect, passwordInput, confirmPasswordInput, termsCheckbox].forEach(input => {
                clearError(input, document.getElementById(`${input.id}-error`));
            });
            updatePasswordStrengthIndicator(''); // Reset strength indicator
            handleLabelWaveEffect(); // Reset label positions
        } else {
            generalError.textContent = response.message;
            generalError.style.display = 'block';
        }
    } catch (error) {
        generalError.textContent = error.message || 'An unexpected error occurred. Please try again later.';
        generalError.style.display = 'block';
        console.error('Registration error:', error);
    } finally {
        // Reset button state
        isSubmitting = false;
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        submitButton.removeAttribute('aria-busy');
    }
});

// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Flatpickr for Date of Birth
    flatpickr("#dob", {
        dateFormat: "Y-m-d",
        maxDate: new Date().setFullYear(new Date().getFullYear() - 13), // Max date is 13 years ago
        // You can add minDate if needed, e.g., new Date().setFullYear(new Date().getFullYear() - 100)
        allowInput: true, // Allow manual input
        onClose: function(selectedDates, dateStr, instance) {
            // Trigger validation when date picker closes
            validateDobField();
            handleLabelWaveEffect(); // Ensure label moves if user picks date
        }
    });

    // Run label wave effect and password toggles
    handleLabelWaveEffect();
    setupPasswordToggles();
    updatePasswordStrengthIndicator(''); // Initialize strength indicator

    // Handle browser autofill for labels
    window.addEventListener('pageshow', (event) => {
        if (event.persisted) {
            handleLabelWaveEffect();
            // Clear any lingering error messages if user navigates back
            [usernameInput, emailInput, dobInput, countrySelect, passwordInput, confirmPasswordInput, termsCheckbox].forEach(input => {
                clearError(input, document.getElementById(`${input.id}-error`));
            });
            generalError.style.display = 'none';
        }
    });

    // Set initial aria-describedby for hints
    [usernameInput, emailInput, dobInput, passwordInput].forEach(input => {
        const hintElement = document.getElementById(`${input.id}-hint`);
        if (hintElement && hintElement.textContent) {
            input.setAttribute('aria-describedby', hintElement.id);
        }
    });
});