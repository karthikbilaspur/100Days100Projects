// Constants
const SIGNIN_FORM = document.getElementById('signin-form');
const SIGNIN_USERNAME_INPUT = document.getElementById('signin-username');
const SIGNIN_PASSWORD_INPUT = document.getElementById('signin-password');
const SIGNIN_BTN = document.getElementById('signin-btn');
const SIGNIN_ERROR_MESSAGE = document.getElementById('signin-error-message');

const LOGIN_FORM = document.getElementById('login-form');
const LOGIN_USERNAME_INPUT = document.getElementById('login-username');
const LOGIN_PASSWORD_INPUT = document.getElementById('login-password');
const LOGIN_BTN = document.getElementById('login-btn');
const LOGIN_ERROR_MESSAGE = document.getElementById('login-error-message');

const SIGNOUT_BTN = document.getElementById('signout-btn');
const LOGOUT_BTN = document.getElementById('logout-btn');

const FORGOT_PASSWORD_LINK = document.getElementById('forgot-password');
const CREATE_ACCOUNT_LINK = document.getElementById('create-account');

// Functions
function signin(event) {
    event.preventDefault();
    const username = SIGNIN_USERNAME_INPUT.value;
    const password = SIGNIN_PASSWORD_INPUT.value;
    if (username === 'admin' && password === 'password') {
        alert('Signed in successfully!');
    } else {
        SIGNIN_ERROR_MESSAGE.textContent = 'Invalid username or password!';
    }
}

function login(event) {
    event.preventDefault();
    const username = LOGIN_USERNAME_INPUT.value;
    const password = LOGIN_PASSWORD_INPUT.value;
    if (username === 'admin' && password === 'password') {
        alert('Logged in successfully!');
    } else {
        LOGIN_ERROR_MESSAGE.textContent = 'Invalid username or password!';
    }
}

function signout() {
    alert('Signed out successfully!');
}

function logout() {
    alert('Logged out successfully!');
}

function forgotPassword() {
    const username = prompt('Enter your username:');
    if (username === 'admin') {
        const newPassword = prompt('Enter your new password:');
        alert('Password reset successfully!');
    } else {
        alert('Invalid username!');
    }
}

function createAccount() {
    const username = prompt('Enter your desired username:');
    const password = prompt('Enter your desired password:');
    alert('Account created successfully!');
}

// Event listeners
SIGNIN_FORM.addEventListener('submit', signin);
LOGIN_FORM.addEventListener('submit', login);
SIGNOUT_BTN.addEventListener('click', signout);
LOGOUT_BTN.addEventListener('click', logout);
FORGOT_PASSWORD_LINK.addEventListener('click', forgotPassword);
CREATE_ACCOUNT_LINK.addEventListener('click', createAccount);

// Accessibility features
document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
        const focusableElements = document.querySelectorAll('.container, .signin-container, .signout-container, .login-container, .logout-container');
        const currentIndex = Array.prototype.indexOf.call(focusableElements, document.activeElement);
        const nextIndex = (currentIndex + 1) % focusableElements.length;
        focusableElements[nextIndex].focus();
    }
});