// Add event listener to explore menu button
document.querySelector('.explore-menu-btn').addEventListener('click', () => {
    document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' });
});

// Add event listener to contact form submission
document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#contact-form input[type="text"]').value;
    const email = document.querySelector('#contact-form input[type="email"]').value;
    const message = document.querySelector('#contact-form textarea').value;
    console.log(`Contact form submitted with name: ${name}, email: ${email}, and message: ${message}`);
});

// Add event listener to reservation form submission
document.querySelector('#reservation-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.querySelector('#reservation-form input[type="date"]').value;
    const time = document.querySelector('#reservation-form input[type="time"]').value;
    const guests = document.querySelector('#reservation-form input[type="number"]').value;
    console.log(`Reservation made for ${date} at ${time} for ${guests} guests.`);
});

// Add event listener to login form submission
document.querySelector('#login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#login-form input[type="email"]').value;
    const password = document.querySelector('#login-form input[type="password"]').value;
    console.log(`Login attempted with email: ${email} and password: ${password}`);
});

// Add event listener to register button click
document.querySelector('#register-btn').addEventListener('click', () => {
    document.querySelector('#login-form').style.display = 'none';
    document.querySelector('#register-form').style.display = 'flex';
});

// Add event listener to register form submission
document.querySelector('#register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#register-form input[type="text"]').value;
    const email = document.querySelector('#register-form input[type="email"]').value;
    const password = document.querySelector('#register-form input[type="password"]').value;
    console.log(`Registration attempted with name: ${name}, email: ${email}, and password: ${password}`);
});