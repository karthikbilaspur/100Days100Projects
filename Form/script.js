// Get the registration form element
const registrationForm = document.getElementById('registration-form');

// Get the login form element
const loginForm = document.getElementById('login-form');

// Get the forgot password form element
const forgotPasswordForm = document.getElementById('forgot-password-form');

// Get the toggle login button element
const toggleLoginButton = document.getElementById('toggle-login-button');

// Get the forgot password link element
const forgotPasswordLink = document.getElementById('forgot-password-link');

// Add an event listener to the registration form
registrationForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the username, email, password, and confirm password input values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if the password and confirm password input values match
    if (password !== confirmPassword) {
        alert('Password and confirm password do not match');
        return;
    }

    // Create a new user object
    const user = {
        username: username,
        email: email,
        password: password
    };

    // Store the user object in local storage
    localStorage.setItem('user', JSON.stringify(user));

    // Display a success message
    alert('Registration successful!');
});

// Add an event listener to the login form
loginForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the username and password input values
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Get the stored user object from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Check if the username and password input values match the stored user object
    if (username === storedUser.username && password === storedUser.password) {
        // Display a success message
        alert('Login successful!');
    } else {
        // Display an error message
        alert('Invalid username or password');
    }
});

// Add an event listener to the forgot password form
forgotPasswordForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the username input value
    const username = document.getElementById('forgot-username').value;

    // Get the stored user object from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Check if the username input value matches the stored user object
    if (username === storedUser.username) {
        // Display a success message
        alert('Password reset successful!');
    } else {
        // Display an error message
        alert('Invalid username');
    }
});

// Add an event listener to the toggle login button
toggleLoginButton.addEventListener('click', function() {
    // Toggle the display of the registration and login forms
    registrationForm.style.display = registrationForm.style.display === 'none' ? 'block' : 'none';
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
});

// Add an event listener to the forgot password link
forgotPasswordLink.addEventListener('click', function() {
    // Toggle the display of the login and forgot password forms
    loginForm.style.display = 'none';
    forgotPasswordForm.style.display = 'block';
});

// Add an event listener to the forgot password form
forgotPasswordForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the username input value
    const username = document.getElementById('forgot-username').value;

    // Get the stored user object from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    // Check if the username input value matches the stored user object
    if (username === storedUser.username) {
        // Display a success message
        alert('Password reset successful!');
    } else {
        // Display an error message
        alert('Invalid username');
    }
});

// Add an event listener to the toggle login button
toggleLoginButton.addEventListener('click', function() {
    // Toggle the display of the registration and login forms
    registrationForm.style.display = registrationForm.style.display === 'none' ? 'block' : 'none';
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
});

// Add an event listener to the forgot password link
forgotPasswordLink.addEventListener('click', function() {
    // Toggle the display of the login and forgot password forms
    loginForm.style.display = 'none';
    forgotPasswordForm.style.display = 'block';
});

// Add an event listener to the back to login link
document.getElementById('back-to-login-link').addEventListener('click', function() {
    // Toggle the display of the forgot password and login forms
    forgotPasswordForm.style.display = 'none';
    loginForm.style.display = 'block';
});