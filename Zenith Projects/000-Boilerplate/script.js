// Add event listener to menu button
document.querySelector('button').addEventListener('click', () => {
    // Scroll to menu section
    document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' });
});

// Add event listener to reservation button
document.querySelector('.reservation-form button').addEventListener('click', () => {
    // Get reservation form data
    const date = document.querySelector('.reservation-form input[type="date"]').value;
    const time = document.querySelector('.reservation-form input[type="time"]').value;
    const guests = document.querySelector('.reservation-form input[type="number"]').value;

    // Send reservation data to server (TO DO)
    console.log(`Reservation made for ${date} at ${time} for ${guests} guests.`);
});

// Add event listener to login/register button
document.querySelector('.login-register-form button').addEventListener('click', () => {
    // Get login/register form data
    const email = document.querySelector('.login-register-form input[type="email"]').value;
    const password = document.querySelector('.login-register-form input[type="password"]').value;

    // Send login/register data to server (TO DO)
    console.log(`Login/Register attempted with email ${email} and password ${password}.`);
});