// --- Constants & DOM Elements ---
const authCard = document.getElementById('auth-card');
const dashboardCard = document.getElementById('dashboard-card');
const dashboardUsername = document.getElementById('dashboard-username');
const pageTitle = document.querySelector('title'); // Get the page title element

const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const twofaForm = document.getElementById('twofa-form'); // New 2FA form
const logoutBtn = document.getElementById('logout-btn');

// Login Form Elements
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');
const loginRememberMeCheckbox = document.getElementById('remember-me'); // New remember me checkbox
const loginSubmitBtn = document.getElementById('login-submit-btn');
const loginSuccessMessage = document.getElementById('login-success');
const loginErrorMessage = document.getElementById('login-error');
const loginEmailError = document.getElementById('login-email-error');
const loginPasswordError = document.getElementById('login-password-error');
const forgotPasswordLink = document.getElementById('forgot-password');

// Register Form Elements
const registerUsernameInput = document.getElementById('register-username');
const registerEmailInput = document.getElementById('register-email');
const registerPasswordInput = document.getElementById('register-password');
const registerConfirmPasswordInput = document.getElementById('register-confirm-password');
const registerSubmitBtn = document.getElementById('register-submit-btn');
const registerSuccessMessage = document.getElementById('register-success');
const registerErrorMessage = document.getElementById('register-error');
const registerUsernameError = document.getElementById('register-username-error');
const registerEmailError = document.getElementById('register-email-error');
const registerPasswordError = document.getElementById('register-password-error');
const registerConfirmPasswordError = document.getElementById('register-confirm-password-error');
const passwordStrengthSegments = document.querySelectorAll('.password-strength.strength-bar-segment'); // Renamed for clarity
const passwordStrengthText = document.getElementById('password-strength-text');

// 2FA Form Elements
const twofaCodeInput = document.getElementById('twofa-code');
const twofaSubmitBtn = document.getElementById('twofa-submit-btn');
const twofaCodeError = document.getElementById('twofa-code-error');
const twofaErrorMessage = document.getElementById('twofa-error');
const resendTwofaCodeBtn = document.getElementById('resend-twofa-code');

// Simulated User Data (in a real app, this would be on the server)
const users = new Map(); // Stores {email: {username, passwordHash, twofaEnabled: boolean}}
let loggedInUser = null; // Stores the email of the currently logged-in user
let userPending2FA = null; // Stores email of user who just logged in, pending 2FA

// --- Utility Functions ---

/**
 * Simulates an API call with a delay.
 * @param {boolean} success - Whether the simulated API call should succeed.
 * @param {any} data - Data to return on success.
 * @param {string} error - Error message to return on failure.
 * @param {number} delayMs - Delay in milliseconds.
 * @returns {Promise<any>}
 */
function simulateApiCall(success, data, error, delayMs = 1000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve(data);
            } else {
                reject({ message: error });
            }
        }, delayMs);
    });
}

/**
 * Shows/hides a loading spinner on a button.
 * @param {HTMLElement} button - The button element.
 * @param {boolean} isLoading - True to show spinner, false to hide.
 */
function setLoadingState(button, isLoading) {
    const btnText = button.querySelector('.btn-text');
    const spinner = button.querySelector('.spinner');
    button.disabled = isLoading;
    if (isLoading) {
        btnText.classList.add('hidden');
        spinner.classList.remove('hidden');
    } else {
        btnText.classList.remove('hidden');
        spinner.classList.add('hidden');
    }
}

/**
 * Displays a message in the UI.
 * @param {HTMLElement} element - The HTML element to display the message in.
 * @param {string} message - The message text.
 * @param {string} type - 'success' or 'error'.
 */
function showAuthMessage(element, message, type) {
    element.textContent = message;
    element.className = `auth-message ${type} active`;
    setTimeout(() => element.classList.remove('active'), 5000); // Hide after 5s
}

/**
 * Clears an error message for a specific input.
 * @param {HTMLElement} errorElement - The error message div.
 * @param {HTMLElement} inputElement - The associated input field.
 */
function clearInputError(errorElement, inputElement) {
    errorElement.textContent = '';
    inputElement.classList.remove('invalid');
    inputElement.setAttribute('aria-invalid', 'false');
}

/**
 * Shows an error message for a specific input.
 * @param {HTMLElement} errorElement - The error message div.
 * @param {HTMLElement} inputElement - The associated input field.
 * @param {string} message - The error message text.
 */
function showInputError(errorElement, inputElement, message) {
    errorElement.textContent = message;
    inputElement.classList.add('invalid');
    inputElement.setAttribute('aria-invalid', 'true');
    inputElement.focus();
}

/**
 * Toggles password visibility for an input field.
 * @param {Event} event - The click event.
 */
function togglePasswordVisibility(event) {
    const toggle = event.currentTarget;
    const targetId = toggle.dataset.target;
    const passwordInput = document.getElementById(targetId);
    const icon = toggle.querySelector('i');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        toggle.setAttribute('aria-label', 'Hide password');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        toggle.setAttribute('aria-label', 'Show password');
    }
}

// --- Form Validation ---

const validationRules = {
    email: (value) => {
        if (!value) return "Email is required.";
        if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format.";
        return null;
    },
    password: (value) => {
        if (!value) return "Password is required.";
        if (value.length < 8) return "Password must be at least 8 characters.";
        if (!/[A-Z]/.test(value)) return "Password needs an uppercase letter.";
        if (!/[a-z]/.test(value)) return "Password needs a lowercase letter.";
        if (!/[0-9]/.test(value)) return "Password needs a number.";
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) return "Password needs a special character."; // More comprehensive special chars
        return null;
    },
    username: (value) => {
        if (!value) return "Username is required.";
        if (value.length < 3) return "Username must be at least 3 characters.";
        if (!/^[a-zA-Z0-9_.]+$/.test(value)) return "Username can only contain letters, numbers, underscores, or periods.";
        return null;
    },
    confirmPassword: (password, confirmPassword) => {
        if (!confirmPassword) return "Confirm password is required.";
        if (password!== confirmPassword) return "Passwords do not match.";
        return null;
    },
    twofaCode: (value) => {
        if (!value) return "Code is required.";
        if (!/^\d{6}$/.test(value)) return "Code must be 6 digits.";
        return null;
    }
};

/**
 * Validates a single input field.
 * @param {HTMLElement} inputElement - The input field.
 * @param {HTMLElement} errorElement - The corresponding error message element.
 * @param {string} ruleName - The name of the validation rule to apply.
 * @param {string} [compareValue] - Optional value for comparison (e.g., for confirm password).
 * @returns {boolean} - True if valid, false otherwise.
 */
function validateInput(inputElement, errorElement, ruleName, compareValue = null) {
    const value = inputElement.value.trim();
    let errorMessage = null;

    if (ruleName === 'confirmPassword') {
        errorMessage = validationRules[ruleName](compareValue, value);
    } else {
        errorMessage = validationRules[ruleName](value);
    }

    if (errorMessage) {
        showInputError(errorElement, inputElement, errorMessage);
        return false;
    } else {
        clearInputError(errorElement, inputElement);
        return true;
    }
}

/**
 * Updates the password strength indicator.
 * @param {string} password - The password string.
 */
function updatePasswordStrength(password) {
    let strength = 0;
    const hasLength = password.length >= 8;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (hasLength) strength++;
    if (hasLower && hasUpper) strength++;
    if (hasNumber) strength++;
    if (hasSpecial) strength++;

    passwordStrengthSegments.forEach((segment, index) => {
        segment.style.backgroundColor = 'transparent';
        if (index < strength) {
            if (strength === 1) segment.style.backgroundColor = varColor('--strength-weak');
            else if (strength === 2) segment.style.backgroundColor = varColor('--strength-medium');
            else if (strength === 3) segment.style.backgroundColor = varColor('--strength-strong');
            else if (strength === 4) segment.style.backgroundColor = varColor('--strength-very-strong');
        }
    });

    let strengthText = '';
    let textColor = '';
    if (password.length === 0) {
        strengthText = '';
    } else if (strength <= 1) {
        strengthText = 'Weak';
        textColor = varColor('--strength-weak');
    } else if (strength === 2) {
        strengthText = 'Medium';
        textColor = varColor('--strength-medium');
    } else if (strength === 3) {
        strengthText = 'Strong';
        textColor = varColor('--strength-strong');
    } else if (strength === 4) {
        strengthText = 'Very Strong';
        textColor = varColor('--strength-very-strong');
    }

    passwordStrengthText.textContent = strengthText;
    passwordStrengthText.style.color = textColor;
}

/** Helper to get CSS variable color */
function varColor(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

// --- Main Logic (Simulated Authentication) ---

/**
 * Handles user login.
 * @param {Event} event - The form submission event.
 */
async function handleLogin(event) {
    event.preventDefault();
    clearInputError(loginEmailError, loginEmailInput);
    clearInputError(loginPasswordError, loginPasswordInput);
    loginSuccessMessage.classList.remove('active');
    loginErrorMessage.classList.remove('active');

    const isEmailValid = validateInput(loginEmailInput, loginEmailError, 'email');
    const isPasswordValid = validateInput(loginPasswordInput, loginPasswordError, 'password');

    if (!isEmailValid ||!isPasswordValid) {
        showAuthMessage(loginErrorMessage, 'Please fix the errors above.', 'error');
        return;
    }

    setLoadingState(loginSubmitBtn, true);

    const email = loginEmailInput.value.trim();
    const password = loginPasswordInput.value.trim();
    const rememberMe = loginRememberMeCheckbox.checked;

    // Simulate API call
    if (users.has(email) && users.get(email).passwordHash === password) { // In real app, compare hash
        await simulateApiCall(true, { user: users.get(email), rememberMe: rememberMe });
        const user = users.get(email);

        if (user.twofaEnabled) { // Simulate 2FA required
            userPending2FA = email;
            loginEmailInput.value = '';
            loginPasswordInput.value = '';
            showAuthMessage(loginSuccessMessage, 'Login successful! Please complete 2FA.', 'success');
            showTwoFaForm();
            pageTitle.textContent = "2FA Required - Secure Auth Portal";
        } else {
            loggedInUser = email;
            // In a real app, 'rememberMe' would affect session duration or token type
            if (rememberMe) {
                localStorage.setItem('rememberedUserEmail', email); // Store user preference
            } else {
                sessionStorage.setItem('sessionUserEmail', email);
            }
            loginEmailInput.value = '';
            loginPasswordInput.value = '';
            showAuthMessage(loginSuccessMessage, 'Login successful!', 'success');
            updateAuthUI(true, user.username);
            pageTitle.textContent = `Welcome, ${user.username} - Secure Auth Portal`;
        }
    } else {
        await simulateApiCall(false, null, 'Invalid email or password.');
        showAuthMessage(loginErrorMessage, 'Invalid email or password.', 'error');
    }

    setLoadingState(loginSubmitBtn, false);
}

/**
 * Handles user registration.
 * @param {Event} event - The form submission event.
 */
async function handleRegister(event) {
    event.preventDefault();
    clearInputError(registerUsernameError, registerUsernameInput);
    clearInputError(registerEmailError, registerEmailInput);
    clearInputError(registerPasswordError, registerPasswordInput);
    clearInputError(registerConfirmPasswordError, registerConfirmPasswordInput);
    registerSuccessMessage.classList.remove('active');
    registerErrorMessage.classList.remove('active');

    const isUsernameValid = validateInput(registerUsernameInput, registerUsernameError, 'username');
    const isEmailValid = validateInput(registerEmailInput, registerEmailError, 'email');
    const isPasswordValid = validateInput(registerPasswordInput, registerPasswordError, 'password');
    const isConfirmPasswordValid = validateInput(registerConfirmPasswordInput, registerConfirmPasswordError, 'confirmPassword', registerPasswordInput.value);

    if (!isUsernameValid ||!isEmailValid ||!isPasswordValid ||!isConfirmPasswordValid) {
        showAuthMessage(registerErrorMessage, 'Please fix the errors above.', 'error');
        return;
    }

    setLoadingState(registerSubmitBtn, true);

    const username = registerUsernameInput.value.trim();
    const email = registerEmailInput.value.trim();
    const password = registerPasswordInput.value.trim(); // In real app, this would be hashed

    // Simulate API call
    if (users.has(email)) {
        await simulateApiCall(false, null, 'Email already registered.');
        showInputError(registerEmailError, registerEmailInput, 'This email is already taken.');
        showAuthMessage(registerErrorMessage, 'Registration failed: Email already exists.', 'error');
    } else {
        // Simulate some users having 2FA enabled by default for demo purposes
        const twofaEnabled = Math.random() < 0.5; // 50% chance for 2FA
        users.set(email, { username, passwordHash: password, twofaEnabled: twofaEnabled }); // Store user (in real app, this goes to DB)
        await simulateApiCall(true, { username, email });
        loggedInUser = email; // Log them in immediately after registration for this demo
        registerUsernameInput.value = '';
        registerEmailInput.value = '';
        registerPasswordInput.value = '';
        registerConfirmPasswordInput.value = '';
        updatePasswordStrength(''); // Clear strength indicator
        showAuthMessage(registerSuccessMessage, 'Registration successful!', 'success');
        updateAuthUI(true, username);
        pageTitle.textContent = `Welcome, ${username} - Secure Auth Portal`;
    }

    setLoadingState(registerSubmitBtn, false);
}

/**
 * Handles 2FA code submission.
 * @param {Event} event - The form submission event.
 */
async function handleTwoFaVerification(event) {
    event.preventDefault();
    clearInputError(twofaCodeError, twofaCodeInput);
    twofaErrorMessage.classList.remove('active');

    const isCodeValid = validateInput(twofaCodeInput, twofaCodeError, 'twofaCode');

    if (!isCodeValid) {
        showAuthMessage(twofaErrorMessage, 'Please enter a valid 6-digit code.', 'error');
        return;
    }

    setLoadingState(twofaSubmitBtn, true);

    const code = twofaCodeInput.value.trim();
    // Simulate checking the code
    if (code === '123456') { // Hardcoded correct 2FA code for demo
        await simulateApiCall(true, { message: '2FA verified' });
        loggedInUser = userPending2FA;
        const user = users.get(loggedInUser);
        sessionStorage.setItem('sessionUserEmail', loggedInUser); // Assume session for 2FA'd users
        userPending2FA = null;
        twofaCodeInput.value = '';
        showAuthMessage(loginSuccessMessage, '2FA verification successful!', 'success');
        updateAuthUI(true, user.username);
        pageTitle.textContent = `Welcome, ${user.username} - Secure Auth Portal`;
    } else {
        await simulateApiCall(false, null, 'Invalid verification code.');
        showAuthMessage(twofaErrorMessage, 'Invalid verification code.', 'error');
    }

    setLoadingState(twofaSubmitBtn, false);
}

/**
 * Handles user logout.
 */
function handleLogout() {
    loggedInUser = null;
    userPending2FA = null;
    localStorage.removeItem('rememberedUserEmail'); // Clear 'remember me'
    sessionStorage.removeItem('sessionUserEmail'); // Clear session
    updateAuthUI(false);
    showAuthMessage(loginSuccessMessage, 'You have been logged out.', 'success'); // Show message on login form
    switchAuthTab(document.querySelector('.auth-tab[data-action="login"]')); // Go back to login tab
    pageTitle.textContent = "Secure Auth Portal"; // Reset title
}

/**
 * Handles "Forgot Password" link click (simulated).
 */
function handleForgotPassword() {
    alert("In a real application, this would send a password reset link to your email.");
    // In a real app: Trigger an API call to request password reset email.
}

/**
 * Simulates resending the 2FA code.
 */
async function handleResendTwoFaCode() {
    resendTwofaCodeBtn.disabled = true;
    resendTwofaCodeBtn.textContent = 'Resending (30s)';
    showAuthMessage(twofaErrorMessage, '', 'error'); // Clear previous error

    await simulateApiCall(true, { message: 'Code resent' }, null, 1500);
    showAuthMessage(twofaErrorMessage, 'New code sent!', 'success');

    let timer = 30;
    const interval = setInterval(() => {
        timer--;
        if (timer > 0) {
            resendTwofaCodeBtn.textContent = `Resending (${timer}s)`;
        } else {
            clearInterval(interval);
            resendTwofaCodeBtn.textContent = 'Resend Code';
            resendTwofaCodeBtn.disabled = false;
        }
    }, 1000);
}

// --- UI Management ---

/**
 * Updates the UI based on authentication state (logged in or out).
 * @param {boolean} isLoggedIn - True if user is logged in, false otherwise.
 * @param {string} [username] - The username to display if logged in.
 */
function updateAuthUI(isLoggedIn, username = '') {
    if (isLoggedIn) {
        authCard.classList.add('hidden');
        dashboardCard.classList.remove('hidden');
        dashboardUsername.textContent = username;
    } else {
        authCard.classList.remove('hidden');
        dashboardCard.classList.add('hidden');
        dashboardUsername.textContent = '';
    }
}

/**
 * Shows the 2FA form and hides other forms.
 */
function showTwoFaForm() {
    authTabs.forEach(tab => tab.classList.add('hidden')); // Hide tabs
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');
    twofaForm.classList.add('active');
    twofaCodeInput.focus(); // Focus the 2FA input
}

/**
 * Switches between login and register tabs.
 * @param {HTMLElement} activeTab - The tab that was clicked.
 */
function switchAuthTab(activeTab) {
    authTabs.forEach(tab => tab.classList.remove('active'));
    activeTab.classList.add('active');

    // Hide all forms first
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');
    twofaForm.classList.remove('active'); // Ensure 2FA is hidden

    // Show only the target form
    const targetForm = document.getElementById(`${activeTab.dataset.action}-form`);
    targetForm.classList.add('active');

    // Clear any messages when switching tabs
    loginSuccessMessage.classList.remove('active');
    loginErrorMessage.classList.remove('active');
    registerSuccessMessage.classList.remove('active');
    registerErrorMessage.classList.remove('active');
    twofaErrorMessage.classList.remove('active'); // Clear 2FA message

    // Reset input fields and errors for all forms
    loginEmailInput.value = '';
    loginPasswordInput.value = '';
    loginRememberMeCheckbox.checked = false;
    clearInputError(loginEmailError, loginEmailInput);
    clearInputError(loginPasswordError, loginPasswordInput);

    registerUsernameInput.value = '';
    registerEmailInput.value = '';
    registerPasswordInput.value = '';
    registerConfirmPasswordInput.value = '';
    clearInputError(registerUsernameError, registerUsernameInput);
    clearInputError(registerEmailError, registerEmailInput);
    clearInputError(registerPasswordError, registerPasswordInput);
    clearInputError(registerConfirmPasswordError, registerConfirmPasswordInput);
    updatePasswordStrength(''); // Clear strength indicator

    twofaCodeInput.value = '';
    clearInputError(twofaCodeError, twofaCodeInput);

    // Reset tab visibility if coming from 2FA
    authTabs.forEach(tab => tab.classList.remove('hidden'));

    // Update page title
    if (activeTab.dataset.action === 'login') {
        pageTitle.textContent = "Login - Secure Auth Portal";
        loginEmailInput.focus();
    } else {
        pageTitle.textContent = "Register - Secure Auth Portal";
        registerUsernameInput.focus();
    }
}

// --- Event Listeners ---

// Tab switching
authTabs.forEach(tab => {
    tab.addEventListener('click', () => switchAuthTab(tab));
});

// Password visibility toggles
document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.addEventListener('click', togglePasswordVisibility);
});

// Form submissions
loginForm.addEventListener('submit', handleLogin);
registerForm.addEventListener('submit', handleRegister);
twofaForm.addEventListener('submit', handleTwoFaVerification); // New 2FA submission handler
logoutBtn.addEventListener('click', handleLogout);
forgotPasswordLink.addEventListener('click', handleForgotPassword);
resendTwofaCodeBtn.addEventListener('click', handleResendTwoFaCode); // New resend 2FA code handler

// Real-time validation & feedback (clear errors on input)
loginEmailInput.addEventListener('input', () => clearInputError(loginEmailError, loginEmailInput));
loginPasswordInput.addEventListener('input', () => clearInputError(loginPasswordError, loginPasswordInput));

registerUsernameInput.addEventListener('input', () => clearInputError(registerUsernameError, registerUsernameInput));
registerEmailInput.addEventListener('input', () => clearInputError(registerEmailError, registerEmailInput));
registerPasswordInput.addEventListener('input', (event) => {
    clearInputError(registerPasswordError, registerPasswordInput);
    updatePasswordStrength(event.target.value);
    // Also clear confirm password error if password changes
    clearInputError(registerConfirmPasswordError, registerConfirmPasswordInput);
});
registerConfirmPasswordInput.addEventListener('input', () => {
    clearInputError(registerConfirmPasswordError, registerConfirmPasswordInput);
});

twofaCodeInput.addEventListener('input', () => clearInputError(twofaCodeError, twofaCodeInput));

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Attempt to auto-login if remembered
    const rememberedEmail = localStorage.getItem('rememberedUserEmail') || sessionStorage.getItem('sessionUserEmail');
    if (rememberedEmail && users.has(rememberedEmail)) {
        loggedInUser = rememberedEmail;
        const user = users.get(loggedInUser);
        updateAuthUI(true, user.username);
        pageTitle.textContent = `Welcome, ${user.username} - Secure Auth Portal`;
        showAuthMessage(loginSuccessMessage, 'Welcome back!', 'success'); // Show a greeting message
    } else {
        updateAuthUI(false);
        switchAuthTab(document.querySelector('.auth-tab[data-action="login"]')); // Default to login tab
        pageTitle.textContent = "Secure Auth Portal"; // Default title
    }
});