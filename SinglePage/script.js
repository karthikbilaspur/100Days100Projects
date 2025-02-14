let isLoggedIn = false;
let username = '';
let password = '';

document.getElementById('signin-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const signinUsername = document.getElementById('signin-username').value;
    const signinPassword = document.getElementById('signin-password').value;
    if (signinUsername === username && signinPassword === password) {
        isLoggedIn = true;
        alert('Signed in successfully!');
    } else {
        document.getElementById('error-message').textContent = 'Invalid username or password!';
    }
});

document.getElementById('signout-btn').addEventListener('click', () => {
    isLoggedIn = false;
    alert('Signed out successfully!');
});

document.getElementById('login-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const loginUsername = document.getElementById('login-username').value;
    const loginPassword = document.getElementById('login-password').value;
    if (loginUsername === username && loginPassword === password) {
        isLoggedIn = true;
        alert('Logged in successfully!');
    } else {
        document.getElementById('error-message').textContent = 'Invalid username or password!';
    }
});

document.getElementById('logout-btn').addEventListener('click', () => {
    isLoggedIn = false;
    alert('Logged out successfully!');
});

document.getElementById('forgot-password').addEventListener('click', () => {
    const forgotPasswordUsername = prompt('Enter your username:');
    if (forgotPasswordUsername === username) {
        const newPassword = prompt('Enter your new password:');
        password = newPassword;
        alert('Password reset successfully!');
    } else {
        alert('Invalid username!');
    }
});

document.getElementById('create-account').addEventListener('click', () => {
    const createAccountUsername = prompt('Enter your desired username:');
    const createAccountPassword = prompt('Enter your desired password:');
    username = createAccountUsername;
    password = createAccountPassword;
    alert('Account created successfully!');
});