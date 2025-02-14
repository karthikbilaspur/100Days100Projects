// Get the button element
const myButton = document.getElementById('myButton');

// Add an event listener to the button
myButton.addEventListener('click', () => {
    // Display an alert message
    alert('Button clicked!');
});

// Get the form element
const contactForm = document.getElementById('contactForm');

// Add an event listener to the form
contactForm.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Validate the form data
    if (name === '' || email === '') {
        alert('Please fill in all fields.');
    } else {
        // Send the form data to the server (optional)
        // ...

        // Display a success message
        alert('Form submitted successfully!');
    }
});

// Add event listener to the navigation menu
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        // Prevent the default link behavior
        event.preventDefault();

        // Get the target section
        const targetSection = document.querySelector(event.target.getAttribute('href'));

        // Scroll to the target section
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Add event listener to the window for scroll events
window.addEventListener('scroll', () => {
    // Get the current scroll position
    const scrollPosition = window.scrollY;

    // Add a class to the header if the scroll position is greater than 100
    if (scrollPosition > 100) {
        document.querySelector('header').classList.add('scrolled');
    } else {
        document.querySelector('header').classList.remove('scrolled');
    }
});